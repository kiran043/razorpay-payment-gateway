import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

// const PaymentSchema = new Schema({
//     razorpay_order_id: {
//         type: String,
//         required: true,
//     },
//     razorpay_payment_id: {
//         type: String,
//         required: true,
//     },
//     razorpay_signature: {
//         type: String,
//         required: true,
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     },
// });
// export default model('payment', PaymentSchema);

const PaymentSchema = new mongoose.Schema({
    razorpay_order_id: {
        type: String,
        required: true,
        unique: true
    },
    razorpay_payment_id: {
        type: String,
        unique: true,
        sparse: true
    },
    razorpay_signature: String,
    amount: Number,
    currency: String,
    status: {
        type: String,
         enum: ["CREATED", "PAID", "FAILED", "CANCELLED"],
        default: "CREATED"
    }
}, { timestamps: true });

export default model('payment', PaymentSchema);
