const VITE_CLOUDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME;
const VITE_CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Optimize a Cloudinary image URL for high-quality display
 * @param {string} url - The raw image URL from Cloudinary
 * @returns {string} - The optimized URL
 */
const optimizeCloudinaryUrl = (url) => {
  if (!url) return "";
  return url.replace("/upload/", "/upload/f_auto,q_auto:best/");
};

/**
 * Upload multiple files to Cloudinary and return optimized image URLs
 * @param {File[]} files - Array of image files to upload
 * @returns {Promise<string[]>} - Optimized image URLs
 */
export const uploadToCloudinary = async (files) => {
  const uploads = files.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", VITE_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${VITE_CLOUDINARY_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return optimizeCloudinaryUrl(data.secure_url);
  });

  try {
    const imageUrls = await Promise.all(uploads);
    return imageUrls;
  } catch (err) {
    console.error("❌ Error uploading some images:", err);
    return [];
  }
};
