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
  mobileNumber: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    enum: ["HR", "Manager", "Sales"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  course: {
    type: String,
    enum: ["MCA", "BCA", "BSC"],
  },
  imageUrl: {
    type: String,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
