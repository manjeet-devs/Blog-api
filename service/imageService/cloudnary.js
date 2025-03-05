const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: "",
    api_key: "",
    api_secret: "",
});

const uploadImage =  async (filePath) => {
    try {        
        const response = await cloudinary.uploader.upload(filePath);
        return response;
    } catch (error) {
        console.error("Cloudinary upload failed:", error);
        throw new Error("Cloudinary upload failed");
    }
};
module.exports = { uploadImage };