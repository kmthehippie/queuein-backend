const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig"); // Ensure this path is correct

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    console.log("req params uploadType:", req.params.uploadType);
    const uploadType = req.params.uploadType;
    let folderName;
    if (uploadType === "outlet_image") {
      console.log("uploading to QueueIn/OutletImages");
      folderName = "QueueIn/OutletImages";
    } else if (uploadType === "profile_picture") {
      console.log("uploading to QueueIn/AccountProfilePictures");
      folderName = "QueueIn/AccountProfilePictures";
    } else if (uploadType === "qr_code") {
      console.log("uploading to QueueIn/QRCode");
      folderName = "QueueIn/QRCode";
    } else {
      folderName = "misc";
    }
    const fileName = file.originalname.split(".")[0];
    const publicId = `${fileName}-${Date.now()}`;

    return {
      folder: folderName,
      allowed_formats: ["jpg", "png", "jpeg"],
      public_id: publicId,
    };
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
