import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const collectionName = 'products';

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    stock: {
        type: Number,
        default: 0
    },
    category: String,
    available: Boolean,     
});

productSchema.plugin(mongoosePaginate);
const productsModel = mongoose.model(collectionName, productSchema);

export default productsModel;