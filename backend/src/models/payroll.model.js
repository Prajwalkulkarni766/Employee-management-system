import mongoose, { Schema, model } from "mongoose";

const deductionSchema = new Schema(
  {
    providentFund: {
      type: Number,
      default: 0,
    },
    lateMark: {
      type: Number,
      default: 0,
    },
    lessWorkMinute: {
      type: Number,
      default: 0,
    },
    halfDay: {
      type: Number,
      default: 0,
    },
    absent: {
      type: Number,
      default: 0,
    },
    totalDeduction: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const earningSchema = new mongoose.Schema(
  {
    salary: {
      type: Number,
      required: [true, "Please provide salary"],
    },
    hra: {
      type: Number,
      required: [true, "Please provide hra"],
    },
    da: {
      type: Number,
      required: [true, "Please provide da"],
    },
    specialAllowances: {
      type: Number,
      default: 0,
    },
    bonus: {
      type: Number,
      default: 0,
    },
    totalEarnings: {
      type: Number,
    },
  },
  { _id: false }
);

const payrollSchema = new Schema(
  {
    employeeId: {
      type: String,
      required: true,
    },
    payMonth: {
      type: String,
      required: true,
    },
    payStatus: {
      type: String,
      default: "Paid",
    },
    earning: earningSchema,
    deduction: deductionSchema,
    netPay: Number,
  },
  { timestamps: true }
);

const Payroll = model("Payroll", payrollSchema);

export default Payroll;
