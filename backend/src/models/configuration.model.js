import mongoose, { Schema, model } from "mongoose";

const configurationSchema = new Schema({
  officeName: String,
  officeStartTime: String,
  officeEndTime: String,
  lateMarkDeduction: Number,
  lessWorkTimeDeduction: Number,
  halfDayWorkingHours: Number,
  totalWorkingHours: Number,
  overTimeWorkingHours: Number,
  overTimeAddition: Number,
  totalCasualLeaves: Number,
  totalMedicalLeaves: Number,
  amountDeductedWhenEmployeeIsAbsent: Number,
  holiday: [String],
});

const Configuration = model("Configuration", configurationSchema);

export default Configuration;
