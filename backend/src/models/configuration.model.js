import mongoose, { Schema, model } from "mongoose";

const configurationSchema = new Schema({
  officeStartTime: Number,
  officeEndTime: Number,
  lateMarkDeduction: Number,
  lessWorkTimeDeduction: Number,
  halfDayDeduction: Number,
  companyLogo: String,
  totalWorkingHours: Number,
  overTimeAddition: Number,
  holiday: {
    type: [String],
    default: [],
  },
});

const Configuration = model("Configuration", configurationSchema);

export default Configuration;
