import mongoose, { Schema, model } from "mongoose";

const deductionSchema = new Schema(
  {
    reasonForDeduction: { type: String },
    amount: { type: Number   },
  },
  { _id: false }
);

const payrollSchema = new Schema(
  {
    employeeId: {
      type: String,
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
    totalAmountPaid: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Payroll = model("Payroll", payrollSchema);

export default Payroll;
