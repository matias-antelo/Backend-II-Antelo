import mongoose, { Schema } from "mongoose";


const collectionName = 'carts';
const cartsSchema = new mongoose.Schema({
  cartNumber: { type: Number, unique: true, required: true },  
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
});

const cartsModel = mongoose.model(collectionName, cartsSchema);

export default cartsModel;