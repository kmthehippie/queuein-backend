const { use } = require("passport");
const prisma = require("../script");

exports.getAccountEmail = async (email) => {
  const emailExist = prisma.account.findUnique({
    where: { companyEmail: email },
  });
  return emailExist;
};

exports.getAccountById = async (id) => {
  const accountIdExist = prisma.account.findUnique({
    where: { id: id },
  });
  return accountIdExist;
};

exports.createAccount = async ({
  companyName,
  companyEmail,
  password,
  hasPassword,
}) => {
  const account = await prisma.account.create({
    data: {
      // Nest the fields within the 'data' object
      companyName: companyName,
      companyEmail: companyEmail,
      password: password,
      hasPassword: hasPassword, // Include hasPassword here
    },
  });
  return account;
};

exports.createStaff = async ({ name, role, email, accountId }) => {
  console.log("Inside query: ", name);

  const staff = await prisma.staff.create({
    data: {
      name,
      role,
      email,
      accountId,
    },
  });
  return staff;
};

exports.createOwnerGoogle = async (data) => {
  const staff = await prisma.staff.create({
    data: {
      name: data.name,
      role: "OWNER",
      accountId: data.accountId,
      email: data.email,
      pfp: data.pfp,
    },
  });
  return staff;
};

exports.createOAuthToken = async (data) => {
  const OAuthToken = await prisma.oAuthToken.create({
    data: {
      provider: data.provider,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      accountId: data.accountId,
      userAgent: data.userAgent,
      lastLoggedIn: data.lastLoggedIn,
    },
  });
  return OAuthToken;
};

exports.updateAccount = async (data) => {
  const account = await prisma.account.update({
    companyName: data.companyName,
    //if password exist then password
    //if password exist, boolean
  });
  return account;
};

exports.getStaffByNameAndAccount = async (name, accountId) => {
  const staff = await prisma.staff.findMany({
    where: { name: name, accountId: accountId },
  });
  return staff;
};

exports.getAllStaff = async () => {
  const allStaff = await prisma.account.findMany();
  return allStaff;
};

exports.updateOAuthToken = async (data) => {
  console.log(data);
  const updatedToken = await prisma.oAuthToken.update({
    where: {
      id: data.id,
    },
    data: {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    },
  });
  return updatedToken;
};

exports.deleteAllOAuthToken = async () => {
  const deleteAll = await prisma.oAuthToken.deleteMany({});
  return deleteAll;
};

exports.findOAuthTokenByRefreshToken = async (refreshToken) => {
  console.log("Refreshtoken in prisma auth query: ", refreshToken);
  const token = await prisma.oAuthToken.findFirst({
    where: {
      refreshToken: refreshToken,
    },
    include: {
      account: true,
    },
  });
  console.log("Finding oauthtoken by refreshtoken ", token);
  return token;
};
exports.findOAuthTokenByAccountIdAndUserAgent = async (
  accountId,
  userAgent
) => {
  const token = await prisma.oAuthToken.findFirst({
    where: {
      accountId: accountId,
      userAgent: userAgent,
    },
  });

  return token;
};

exports.deleteOAuthTokenByRefreshToken = async (refreshToken) => {
  const deletedToken = await prisma.oAuthToken.deleteMany({
    where: {
      refreshToken: refreshToken,
    },
  });
  return deletedToken;
};

exports.findAllOAuthToken = async () => {
  const allAuthTokens = await prisma.oAuthToken.findMany();
  return allAuthTokens;
};

exports.findOAuthTokenByOID = async (oid) => {
  const OAuthToken = await prisma.oAuthToken.findUnique({
    where: {
      id: oid,
    },
  });
  return OAuthToken;
};

exports.deleteOAuthTokenByOID = async (oid) => {
  const deletedToken = await prisma.oAuthToken.deleteMany({
    where: {
      id: oid,
    },
  });
  return deletedToken;
};
