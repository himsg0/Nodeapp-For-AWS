const cloudinary = require("cloudinary").v2;
const envs = require('../config');

cloudinary.config({
    cloud_name : envs.CLOUDINARY_CLOUD_NAME,
    api_key : envs.CLOUDINARY_CLOUD_API_KEY,
    api_secret : envs.CLOUDINARY_CLOUD_API_SECRET,
});

module.exports = cloudinary;