import mongoose from "mongoose";

const translationSchema = new mongoose.Schema({
  en: { type: String },
  ka: { type: String }
}, { _id: false });


const productSchema = new mongoose.Schema({
    title: { 
        type: translationSchema
    },
    description: { 
        type: translationSchema 
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",

    },
    price: {
        type: Number,
        min: 0
    },
    stars: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    image: {
        type: String,

    }
}, { timestamps: true });

export default mongoose.model("Products", productSchema);