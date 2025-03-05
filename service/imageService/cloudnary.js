const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: "dhbbq7vrl",
    api_key: "215929615689395",
    api_secret: "DMTrreCzonzapzCNE7BQQC61a-o",
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