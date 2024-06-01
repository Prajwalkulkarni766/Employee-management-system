// const payrollSchema = new Schema({
//   employee: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "employee",
//     required: true,
//   },
//   employeeName: {
//     type: String,
//     required: true,
//   },
//   payStartDate: {
//     type: Date,
//     required: true,
//   },
//   payEndDate: {
//     type: Date,
//     required: true,
//   },
//   payStatus: {
//     type: String,
//     enum: ["Pending", "Processed", "Paid"],
//     required: true,
//   },
//   deduction: {
//     type: [{ reasonForDeduction, amount }],
//   },
//   overTime: {
//     type: [{ amount }],
//   },
//   totalAmountPaid: {
//     type: Number,
//     required: true,
//   },
// });

import mongoose, { Schema, model } from "mongoose";

const deductionSchema = new Schema(
  {
    reasonForDeduction: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { _id: false }
);

const overtimeSchema = new Schema(
  {
    amount: { type: Number, required: true },
  },
  { _id: false }
);

const payrollSchema = new Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },
  payStartDate: {
    type: Date,
    required: true,
  },
  payEndDate: {
    type: Date,
    required: true,
  },
  payStatus: {
    type: String,
    enum: ["Pending", "Processed", "Paid"],
    required: true,
  },
  deduction: [deductionSchema],
  overTime: [overtimeSchema],
  totalAmountPaid: {
    type: Number, // This can be a virtual field for automatic calculation
    required: true,
  },
});

const Payroll = model("Payroll", payrollSchema);

export default Payroll;
