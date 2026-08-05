import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

/**
 * Extract Cloudinary public_id from a full delivery URL.
 */
const getPublicIdFromUrl = (url = "") => {
    try {
        const parts = url.split("/");
        const uploadIndex = parts.findIndex((part) => part === "upload");
        if (uploadIndex === -1) return null;

        let pathParts = parts.slice(uploadIndex + 1);
        if (pathParts[0] && /^v\d+$/.test(pathParts[0])) {
            pathParts = pathParts.slice(1);
        }

        const publicPath = pathParts.join("/");
        return publicPath.replace(/\.[^/.]+$/, "");
    } catch {
        return null;
    }
};

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "streamcraft"
        });

        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
};

const deleteFromCloudinary = async (url, resourceType = "image") => {
    try {
        if (!url) return null;

        const publicId = getPublicIdFromUrl(url);
        if (!publicId) return null;

        return await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType
        });
    } catch {
        return null;
    }
};

export { uploadOnCloudinary, deleteFromCloudinary, getPublicIdFromUrl }
