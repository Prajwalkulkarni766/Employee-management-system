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
    earning: earningSchema,
    deduction: deductionSchema,
  },
  { timestamps: true }
);

// calculate totalEarnings and totalDeductions
payrollSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  this.earning.totalEarnings =
    this.earning.salary +
    this.earning.hra +
    this.earning.da +
    this.earning.specialAllowances +
    this.earning.bonus;
});

const Payroll = model("Payroll", payrollSchema);

export default Payroll;
