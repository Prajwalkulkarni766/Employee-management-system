import mongoose, { Schema, model } from "mongoose";

const configurationSchema = new Schema({
  officeStartTime: String,
  officeEndTime: String,
  lateMarkDeduction: Number,
  lessWorkTimeDeduction: Number,
  halfDayDeduction: Number,
  totalWorkingHours: Number,
  overTimeAddition: Number,
  holiday: [String],
});

const Configuration = model("Configuration", configurationSchema);

export default Configuration;
