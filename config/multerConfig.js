const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");

// Upload type configurations
const uploadConfigs = {
  outlet_image: {
    folder: "QueueIn/OutletImages",
    allowedFormats: ["jpg", "png", "jpeg"],
    maxSize: 5 * 1024 * 1024,
    allowedMimeTypes: ["image/jpeg", "image/jpg", "image/png"],
  },
  profile_picture: {
    folder: "QueueIn/AccountProfilePictures",
    allowedFormats: ["jpg", "png", "jpeg"],
    maxSize: 2 * 1024 * 1024,
    allowedMimeTypes: ["image/jpeg", "image/jpg", "image/png"],
  },
  qr_code: {
    folder: "QueueIn/QRCode",
    allowedFormats: ["png", "jpg"],
    maxSize: 1 * 1024 * 1024,
    allowedMimeTypes: ["image/png", "image/jpg", "image/jpeg"],
  },
};

// Memory storage
const storage = multer.memoryStorage();

// Create upload middleware
const createUpload = (uploadType) => {
  const config = uploadConfigs[uploadType];
  if (!config) throw new Error(`Invalid upload type: ${uploadType}`);

  return multer({
    storage: storage,
    limits: { fileSize: config.maxSize },
    fileFilter: (req, file, cb) => {
      if (!config.allowedMimeTypes.includes(file.mimetype)) {
        return cb(
          new Error(`Only ${config.allowedFormats.join(", ")} files allowed`)
        );
      }
      cb(null, true);
    },
  });
};

// Upload to Cloudinary
const uploadToCloudinary = async (
  buffer,
  uploadType,
  customPublicId = null
) => {
  const config = uploadConfigs[uploadType];
  if (!config) throw new Error(`Invalid upload type: ${uploadType}`);

  const publicId = customPublicId || `upload-${Date.now()}`;

  const uploadOptions = {
    folder: config.folder,
    public_id: publicId,
    resource_type: "image",
    allowed_formats: config.allowedFormats,
  };

  console.log(`🚀 Uploading ${uploadType} to:`, config.folder);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error) {
          console.error(`❌ ${uploadType} upload failed:`, error);
          reject(error);
        } else {
          console.log(`✅ ${uploadType} uploaded:`, result.secure_url);
          resolve(result);
        }
      })
      .end(buffer);
  });
};

// Generic upload handler for routes
const handleFileUpload = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const uploadType = req.params.uploadType;
    const fileName = req.file.originalname.split(".")[0];
    const publicId = `${fileName}-${Date.now()}`;

    const result = await uploadToCloudinary(
      req.file.buffer,
      uploadType,
      publicId
    );
    req.uploadedFile = result;

    next();
  } catch (error) {
    res.status(500).json({
      error: "File upload failed",
      details: error.message,
    });
  }
};

module.exports = {
  // Individual upload middleware
  uploadOutletImage: createUpload("outlet_image"),
  uploadProfilePicture: createUpload("profile_picture"),
  uploadQRCode: createUpload("qr_code"),

  // Functions
  uploadToCloudinary,
  handleFileUpload,
  uploadConfigs,

  // Generic upload (reads type from params)
  upload: multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const uploadType = req.params.uploadType;
      const config = uploadConfigs[uploadType];

      if (!config) {
        return cb(new Error(`Invalid upload type: ${uploadType}`));
      }

      if (!config.allowedMimeTypes.includes(file.mimetype)) {
        return cb(
          new Error(`Only ${config.allowedFormats.join(", ")} files allowed`)
        );
      }

      cb(null, true);
    },
  }),
};
