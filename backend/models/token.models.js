import mongoose from "mongoose";

const resetPasswordTokens = new mongoose.Schema({
    token: {
        type: String
    },
    email: {
        type: String
    }

})

export default mongoose.model('ResetTokens', resetPasswordTokens)