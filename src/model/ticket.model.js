import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true
            },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    status: { type: String, default: "completed" }
});

const TicketsModel = mongoose.model("tickets", ticketSchema);
export default TicketsModel;
