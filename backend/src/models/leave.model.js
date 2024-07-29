import mongoose, { Schema, model } from "mongoose";

const leaveSchema = new Schema(
  {
    employeeId: {
      type: String,
      required: true,
    },
    leaveType: {
      type: String,
      enum: ["Medical", "Casual"],
      required: true,
    },
    leaveReason: {
      type: String,
      required: true,
    },
    leaveStartDate: {
      type: Date,
      required: true,
    },
    leaveEndDate: {
      type: Date,
      required: true,
    },
    leaveDuration: {
      type: Number,
    },
    isPaid: {
      type: Boolean,
      required: true,
    },
    leaveStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Cancelled"],
      required: true,
      default: "Pending",
    },
  },
  { timestamps: true }
);

leaveSchema.pre("save", function (next) {
  this.leaveDuration =
    this.leaveEndDate.getDate() + 1 - this.leaveStartDate.getDate();
  next();
});

const Leave = model("Leave", leaveSchema);

export default Leave;
