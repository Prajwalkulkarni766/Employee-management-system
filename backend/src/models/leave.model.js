import mongoose, { Schema, model } from "mongoose";

const leaveSchema = new Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  leaveType: {
    type: String,
    enum: ["Vacation", "Sick Leave", "Parental Leave", "Casual"],
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
    required: true,
  },
  isPaid: {
    type: Boolean,
    required: true,
  },
  leaveStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Cancelled"],
    required: true,
  },
});

const Leave = model("Leave", leaveSchema);

export default Leave;
