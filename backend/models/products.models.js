import mongoose from "mongoose";

const translationSchema = new mongoose.Schema({
  en: { type: String },
  ka: { type: String }
}, { _id: false });

const currencySchema = new mongoose.Schema({
  usd: { type: mongoose.Schema.Types.Double, min: 0, max: 500 },
  gel: { type: mongoose.Schema.Types.Double, min: 0, max: 500 }
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
        type: currencySchema
    },
    stars: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    countInStock: {
        type: Number,
        min: 0,
        default: 0
    },
    hidden: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,

    }
}, { timestamps: true });

export default mongoose.model("Products", productSchema);