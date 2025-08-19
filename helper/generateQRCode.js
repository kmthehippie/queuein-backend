const cloudinary = require("../config/cloudinaryConfig");
const qrCode = require("qrcode");
const { updateQRCodeForOutletId } = require("../db/authQueries");

const generateQRCode = async ({ outletId, accountId, acctSlug }) => {
  console.log("Generating QR Code: ", acctSlug, accountId, outletId);
  const outletUrl = `${process.env.DOMAIN_NAME}/${acctSlug}/outlet/${outletId}?source=qr`;
  const genQRCodeImage = await qrCode.toDataURL(outletUrl, {
    type: "image/png",
    width: 250,
    errorCorrectionLevel: "H",
  });
  const uploadResult = await cloudinary.uploader.upload(genQRCodeImage, {
    folder: `QueueIn/QRCode`,
    public_id: `${accountId}-qr-${outletId}`,
  });

  if (uploadResult) {
    const updateOutlet = await updateQRCodeForOutletId({
      outletId: parseInt(outletId),
      accountId: accountId,
      qrCode: uploadResult.secure_url,
    });
    console.log("Outlet has been updated with qr code url: ", updateOutlet);
    return updateOutlet;
  }
};

module.exports = { generateQRCode };
