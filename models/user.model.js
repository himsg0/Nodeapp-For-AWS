const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
   
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    cloudinary_id: {
        type: String
    },
    kubecoin: {
        type: Number
        
    },
    phone: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    deletedAt: Date,
    updatedAt: Date,
    image: {
        type: String,
    },
    favouriteStores: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Store',
            default: []
        }
    ]
}, { versionKey: false });
const User = mongoose.model("users", UserSchema);
module.exports = User;