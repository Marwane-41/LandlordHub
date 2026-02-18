import mongoose, { Schema } from "mongoose";

// 1 - create a schema 
// 2 - model based off of that schema 

const paymentSchema = new mongoose.Schema({
    tenantName: { type: String, required: true },
    amount: { type: Number,},
    datePaid: { type: Date, required: true },
    status: { type: String, required: true },
  }, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema); 

export default Payment;