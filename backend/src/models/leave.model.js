import mongoose, { Schema, model } from "mongoose";

const leaveSchema = new Schema(
  {
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
      default: "Pending",
    },
    leaveYear: {
      type: Number,
      default: this.leaveStartDate.getFullYear(),
    },
    leaveMonth: {
      type: Number,
      default: this.leaveStartDate.getMonth(),
    },
  },
  { timestamps: true }
);

leaveSchema.virtual("remainingLeaves", {
  ref: "Leave",
  localField: "leaveType",
  foreignField: "leaveType",
  get: async function () {
    const currentYear = this.leaveYear;
    const totalLeaves = await Leave.getTotalLeaves(currentYear);

    const usedLeaves = await Leave.countDocuments({
      leaveType: this.leaveType,
      employee: this.employee,
      leaveYear,
      leaveStatus: { $in: ["Approved", "Cancelled"] },
    });

    return totalLeaves[this.leaveType] - usedLeaves;
  },
});

leaveSchema.virtual("isPaid", {
  get() {
    return this.remainingLeaves > 0;
  },
});

Leave.getTotalLeaves = async function (year) {
  const totalLeaves = {
    casual: 10,
    medical: 10,
  };
  return totalLeaves;
};

const Leave = model("Leave", leaveSchema);

export default Leave;
