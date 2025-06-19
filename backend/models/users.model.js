import mongoose from "mongoose";

const users = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    wishlist: {
        type: Array,
    },
    cart: {
        type: Array,
    },
    admin: {
        type: Boolean,
        default: false
    },
    banned: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})

export default mongoose.model('Users', users)