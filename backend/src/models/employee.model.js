import mongoose, { Schema, model } from "mongoose";

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  education: {
    type: {},
  },
  jobTitle: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  additionalData: {
    type: Object,
    default: {},
  },
  role: {
    type: String,
    enum: ["employee", "admin"],
    default: "employee",
  },
  password: {
    type: String,
    required: true,
  },
});

const Employee = model("Employee", employeeSchema);

export default Employee;
