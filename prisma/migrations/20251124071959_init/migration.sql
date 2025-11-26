-- CreateEnum
CREATE TYPE "BusinessType" AS ENUM ('RESTAURANT', 'CLINIC', 'BASIC');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('FREE', 'TRIALING', 'ACTIVE', 'PAST_DUE', 'CANCELED', 'UNPAID', 'INCOMPLETE', 'PAUSED');

-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('FREE', 'BASIC', 'PROFESSIONAL', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TIER_1', 'TIER_2', 'TIER_3', 'TIER_4');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('LOCAL', 'GOOGLE', 'GITHUB', 'FACEBOOK');

-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('ACCOUNT_CREATED', 'ACCOUNT_UPDATED', 'ACCOUNT_DELETED', 'PRIVACY_POLICY_ACCEPTED', 'STAFF_CREATED', 'STAFF_UPDATED', 'STAFF_DELETED', 'STAFF_VERIFIED', 'STAFF_QUEUE_ACCESS', 'QUEUE_CREATED', 'QUEUE_CLOSED', 'QUEUE_ITEM_CREATED', 'QUEUE_ITEM_DELETED', 'CUSTOMER_CREATED', 'CUSTOMER_UPDATED', 'CUSTOMER_DELETED', 'PDPA_CONSENT_GIVEN', 'OUTLET_CREATED', 'OUTLET_UPDATED', 'OUTLET_DELETED', 'CRON_CLEANUP_OLD_QUEUE_ITEMS', 'CRON_CLOSE_INACTIVE_QUEUES', 'SYSTEM_ERROR', 'SUBSCRIPTION_CREATED', 'SUBSCRIPTION_UPDATED', 'SUBSCRIPTION_CANCELED', 'PAYMENT_SUCCEEDED', 'PAYMENT_FAILED', 'INVOICE_CREATED', 'INVOICE_PAID', 'SMS_SENT', 'SMS_FAILED', 'SMS_CREDITS_PURCHASED', 'SMS_CREDITS_LOW', 'SMS_API_KEY_ADDED', 'SMS_API_KEY_REMOVED');

-- CreateEnum
CREATE TYPE "BillingCycle" AS ENUM ('MONTHLY', 'YEARLY', 'QUARTERLY');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'SUCCEEDED', 'FAILED', 'CANCELED', 'REFUNDED', 'PARTIALLY_REFUNDED');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'OPEN', 'PAID', 'VOID', 'UNCOLLECTIBLE');

-- CreateEnum
CREATE TYPE "SmsMessageType" AS ENUM ('QUEUE_JOINED', 'QUEUE_POSITION_UPDATE', 'QUEUE_READY', 'QUEUE_CALLED', 'QUEUE_CANCELLED', 'QUEUE_NO_SHOW', 'CUSTOM_MESSAGE', 'TEST_MESSAGE');

-- CreateEnum
CREATE TYPE "SmsStatus" AS ENUM ('PENDING', 'SENT', 'DELIVERED', 'FAILED', 'REJECTED', 'EXPIRED', 'UNDELIVERED');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyName" VARCHAR(1000),
    "companyEmail" VARCHAR(1000) NOT NULL,
    "password" TEXT,
    "hasPassword" BOOLEAN NOT NULL DEFAULT false,
    "primaryAuthProvider" "Provider" NOT NULL DEFAULT 'LOCAL',
    "googleId" TEXT,
    "facebookId" TEXT,
    "logo" VARCHAR(255),
    "slug" VARCHAR(255) NOT NULL,
    "businessType" "BusinessType" NOT NULL DEFAULT 'BASIC',
    "privacyPolicyAccepted" BOOLEAN NOT NULL DEFAULT false,
    "privacyPolicyAcceptedAt" TIMESTAMP(3),
    "privacyPolicyVersion" VARCHAR(50),
    "stripeCustomerId" VARCHAR(255),
    "stripeSubscriptionId" VARCHAR(255),
    "subscriptionStatus" "SubscriptionStatus" NOT NULL DEFAULT 'FREE',
    "subscriptionTier" "SubscriptionTier" NOT NULL DEFAULT 'FREE',
    "subscriptionStartDate" TIMESTAMP(3),
    "subscriptionEndDate" TIMESTAMP(3),
    "trialEndsAt" TIMESTAMP(3),
    "currentPeriodStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentPeriodEnd" TIMESTAMP(3),
    "queuesCreatedThisMonth" INTEGER NOT NULL DEFAULT 0,
    "queueItemsCreatedThisMonth" INTEGER NOT NULL DEFAULT 0,
    "totalOutlets" INTEGER NOT NULL DEFAULT 0,
    "totalStaff" INTEGER NOT NULL DEFAULT 0,
    "smsCreditsRemaining" INTEGER NOT NULL DEFAULT 0,
    "smsSentThisMonth" INTEGER NOT NULL DEFAULT 0,
    "smsSentTotal" INTEGER NOT NULL DEFAULT 0,
    "smsEnabled" BOOLEAN NOT NULL DEFAULT false,
    "smsApiKey" VARCHAR(500),
    "smsApiKeyAddedAt" TIMESTAMP(3),

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(1000) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'TIER_3',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountId" TEXT NOT NULL,
    "email" VARCHAR(1000),
    "pfp" VARCHAR(255),
    "googleId" TEXT,
    "facebookId" TEXT,
    "password" TEXT,
    "staffNumber" SERIAL NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OAuthToken" (
    "id" TEXT NOT NULL,
    "provider" "Provider" NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accountId" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "deviceName" TEXT,
    "lastLoggedIn" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "OAuthToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Outlet" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(1000),
    "accountId" TEXT NOT NULL,
    "location" VARCHAR(2000),
    "googleMaps" VARCHAR(255),
    "wazeMaps" VARCHAR(255),
    "imgUrl" VARCHAR(255),
    "qrCode" VARCHAR(255),
    "defaultEstWaitTime" INTEGER,
    "phone" VARCHAR(1000),
    "hours" TEXT,
    "showPax" BOOLEAN DEFAULT true,
    "outletNumber" SERIAL NOT NULL,

    CONSTRAINT "Outlet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Queue" (
    "id" TEXT NOT NULL,
    "outletId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT,
    "accountId" TEXT NOT NULL,
    "maxQueueItems" INTEGER NOT NULL DEFAULT 999,

    CONSTRAINT "Queue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(1000),
    "number" VARCHAR(1000),
    "VIP" BOOLEAN NOT NULL DEFAULT true,
    "accountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pdpaConsent" BOOLEAN NOT NULL DEFAULT false,
    "pdpaConsentAt" TIMESTAMP(3),
    "pdpaConsentIp" VARCHAR(45),

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueueItem" (
    "id" TEXT NOT NULL,
    "queueId" TEXT NOT NULL,
    "customerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pax" INTEGER NOT NULL,
    "name" VARCHAR(1000),
    "contactNumber" VARCHAR(1000) NOT NULL,
    "called" BOOLEAN NOT NULL DEFAULT false,
    "calledAt" TIMESTAMP(3),
    "seated" BOOLEAN NOT NULL DEFAULT false,
    "seatedAt" TIMESTAMP(3),
    "quit" BOOLEAN NOT NULL DEFAULT false,
    "quitAt" TIMESTAMP(3),
    "noShow" BOOLEAN NOT NULL DEFAULT false,
    "noShowAt" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "position" INTEGER NOT NULL,
    "inactiveAt" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 0,
    "fcmToken" VARCHAR(255),
    "secretToken" VARCHAR(255),
    "pdpaConsent" BOOLEAN NOT NULL DEFAULT false,
    "pdpaConsentAt" TIMESTAMP(3),
    "pdpaConsentIp" VARCHAR(45),
    "createdByStaffId" TEXT,
    "smsNotificationEnabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "QueueItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "staffId" TEXT,
    "actionType" "ActionType" NOT NULL,
    "actionDetails" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountId" TEXT NOT NULL,
    "outletId" TEXT,
    "ipAddress" VARCHAR(45),
    "userAgent" VARCHAR(500),
    "isCronJob" BOOLEAN NOT NULL DEFAULT false,
    "entityType" VARCHAR(50),
    "entityId" VARCHAR(255),

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "stripeSubscriptionId" VARCHAR(255) NOT NULL,
    "stripePriceId" VARCHAR(255) NOT NULL,
    "stripeProductId" VARCHAR(255) NOT NULL,
    "tier" "SubscriptionTier" NOT NULL,
    "status" "SubscriptionStatus" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "canceledAt" TIMESTAMP(3),
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "currentPeriodStart" TIMESTAMP(3) NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "billingCycle" "BillingCycle" NOT NULL DEFAULT 'MONTHLY',
    "amount" INTEGER NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'sgd',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "subscriptionId" TEXT,
    "stripePaymentIntentId" VARCHAR(255) NOT NULL,
    "stripeChargeId" VARCHAR(255),
    "stripeInvoiceId" VARCHAR(255),
    "amount" INTEGER NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'sgd',
    "status" "PaymentStatus" NOT NULL,
    "paymentMethod" VARCHAR(100),
    "cardLast4" VARCHAR(4),
    "cardBrand" VARCHAR(50),
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paidAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "refundedAt" TIMESTAMP(3),
    "refundAmount" INTEGER,
    "ipAddress" VARCHAR(45),

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "subscriptionId" TEXT,
    "stripeInvoiceId" VARCHAR(255) NOT NULL,
    "stripeInvoiceNumber" VARCHAR(100),
    "stripeInvoicePdf" VARCHAR(500),
    "stripeHostedInvoiceUrl" VARCHAR(500),
    "amount" INTEGER NOT NULL,
    "amountDue" INTEGER NOT NULL,
    "amountPaid" INTEGER NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'sgd',
    "status" "InvoiceStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "voidedAt" TIMESTAMP(3),
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SmsNotification" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "queueItemId" TEXT,
    "phoneNumber" VARCHAR(20) NOT NULL,
    "countryCode" VARCHAR(5) NOT NULL DEFAULT '+65',
    "messageType" "SmsMessageType" NOT NULL,
    "messageBody" TEXT NOT NULL,
    "providerId" VARCHAR(255),
    "providerStatus" "SmsStatus" NOT NULL DEFAULT 'PENDING',
    "providerResponse" TEXT,
    "creditsCost" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "errorCode" VARCHAR(50),
    "errorMessage" VARCHAR(500),
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "maxRetries" INTEGER NOT NULL DEFAULT 3,
    "ipAddress" VARCHAR(45),
    "userAgent" VARCHAR(500),

    CONSTRAINT "SmsNotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_companyName_key" ON "Account"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "Account_companyEmail_key" ON "Account"("companyEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Account_googleId_key" ON "Account"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_facebookId_key" ON "Account"("facebookId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_slug_key" ON "Account"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Account_stripeCustomerId_key" ON "Account"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_stripeSubscriptionId_key" ON "Account"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "Account_slug_idx" ON "Account"("slug");

-- CreateIndex
CREATE INDEX "Account_stripeCustomerId_idx" ON "Account"("stripeCustomerId");

-- CreateIndex
CREATE INDEX "Account_subscriptionStatus_idx" ON "Account"("subscriptionStatus");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");

-- CreateIndex
CREATE INDEX "Staff_accountId_idx" ON "Staff"("accountId");

-- CreateIndex
CREATE INDEX "Staff_name_idx" ON "Staff"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_accountId_staffNumber_key" ON "Staff"("accountId", "staffNumber");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthToken_provider_accountId_key" ON "OAuthToken"("provider", "accountId");

-- CreateIndex
CREATE INDEX "Outlet_accountId_idx" ON "Outlet"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Outlet_accountId_outletNumber_key" ON "Outlet"("accountId", "outletNumber");

-- CreateIndex
CREATE INDEX "Queue_outletId_idx" ON "Queue"("outletId");

-- CreateIndex
CREATE INDEX "Queue_accountId_idx" ON "Queue"("accountId");

-- CreateIndex
CREATE INDEX "Customer_accountId_idx" ON "Customer"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_number_accountId_key" ON "Customer"("number", "accountId");

-- CreateIndex
CREATE UNIQUE INDEX "QueueItem_secretToken_key" ON "QueueItem"("secretToken");

-- CreateIndex
CREATE INDEX "QueueItem_queueId_idx" ON "QueueItem"("queueId");

-- CreateIndex
CREATE INDEX "QueueItem_position_idx" ON "QueueItem"("position");

-- CreateIndex
CREATE INDEX "QueueItem_createdByStaffId_idx" ON "QueueItem"("createdByStaffId");

-- CreateIndex
CREATE INDEX "AuditLog_staffId_idx" ON "AuditLog"("staffId");

-- CreateIndex
CREATE INDEX "AuditLog_accountId_idx" ON "AuditLog"("accountId");

-- CreateIndex
CREATE INDEX "AuditLog_outletId_idx" ON "AuditLog"("outletId");

-- CreateIndex
CREATE INDEX "AuditLog_actionType_idx" ON "AuditLog"("actionType");

-- CreateIndex
CREATE INDEX "AuditLog_timestamp_idx" ON "AuditLog"("timestamp");

-- CreateIndex
CREATE INDEX "AuditLog_isCronJob_idx" ON "AuditLog"("isCronJob");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeSubscriptionId_key" ON "Subscription"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "Subscription_accountId_idx" ON "Subscription"("accountId");

-- CreateIndex
CREATE INDEX "Subscription_stripeSubscriptionId_idx" ON "Subscription"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "Subscription_status_idx" ON "Subscription"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_stripePaymentIntentId_key" ON "Payment"("stripePaymentIntentId");

-- CreateIndex
CREATE INDEX "Payment_accountId_idx" ON "Payment"("accountId");

-- CreateIndex
CREATE INDEX "Payment_subscriptionId_idx" ON "Payment"("subscriptionId");

-- CreateIndex
CREATE INDEX "Payment_stripePaymentIntentId_idx" ON "Payment"("stripePaymentIntentId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- CreateIndex
CREATE INDEX "Payment_createdAt_idx" ON "Payment"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_stripeInvoiceId_key" ON "Invoice"("stripeInvoiceId");

-- CreateIndex
CREATE INDEX "Invoice_accountId_idx" ON "Invoice"("accountId");

-- CreateIndex
CREATE INDEX "Invoice_subscriptionId_idx" ON "Invoice"("subscriptionId");

-- CreateIndex
CREATE INDEX "Invoice_stripeInvoiceId_idx" ON "Invoice"("stripeInvoiceId");

-- CreateIndex
CREATE INDEX "Invoice_status_idx" ON "Invoice"("status");

-- CreateIndex
CREATE INDEX "Invoice_createdAt_idx" ON "Invoice"("createdAt");

-- CreateIndex
CREATE INDEX "SmsNotification_accountId_idx" ON "SmsNotification"("accountId");

-- CreateIndex
CREATE INDEX "SmsNotification_queueItemId_idx" ON "SmsNotification"("queueItemId");

-- CreateIndex
CREATE INDEX "SmsNotification_providerStatus_idx" ON "SmsNotification"("providerStatus");

-- CreateIndex
CREATE INDEX "SmsNotification_messageType_idx" ON "SmsNotification"("messageType");

-- CreateIndex
CREATE INDEX "SmsNotification_createdAt_idx" ON "SmsNotification"("createdAt");

-- CreateIndex
CREATE INDEX "SmsNotification_phoneNumber_idx" ON "SmsNotification"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuthToken" ADD CONSTRAINT "OAuthToken_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outlet" ADD CONSTRAINT "Outlet_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES "Outlet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueueItem" ADD CONSTRAINT "QueueItem_queueId_fkey" FOREIGN KEY ("queueId") REFERENCES "Queue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueueItem" ADD CONSTRAINT "QueueItem_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueueItem" ADD CONSTRAINT "QueueItem_createdByStaffId_fkey" FOREIGN KEY ("createdByStaffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES "Outlet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmsNotification" ADD CONSTRAINT "SmsNotification_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmsNotification" ADD CONSTRAINT "SmsNotification_queueItemId_fkey" FOREIGN KEY ("queueItemId") REFERENCES "QueueItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
