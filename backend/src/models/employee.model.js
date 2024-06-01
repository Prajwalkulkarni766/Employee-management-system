import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
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
  imageUrl: {
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
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
