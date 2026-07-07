const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


async function uploadFile({ buffer, filename, folder = "", resourceType = "image" }) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        public_id: filename ? filename.split('.')[0] : undefined, // Strips extension if provided
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result); // Returns the uploaded file object containing secure_url
      }
    );

    // Write the buffer data directly to the stream
    uploadStream.end(buffer);
  });
}

module.exports = { uploadFile }
