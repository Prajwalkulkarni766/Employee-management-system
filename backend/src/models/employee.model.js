import mongoose from "mongoose";
import bcrypt from "bcrypt";

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    unique: true,
    index: true,
  },
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: [true, "Please provide gender"],
  },
  mobileNumber: {
    type: Number,
    required: [true, "Please provide mobile number"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },
  designation: {
    type: String,
  },
  department: {
    type: String,
    required: [true, "Please provide department"],
    enum: ["Development", "Designing", "Testing", "HR"],
  },
  address: {
    type: String,
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
  education: {
    type: String,
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
  role: {
    type: String,
    enum: ["Employee", "Admin"],
    default: "employee",
  },
  isWorking: {
    type: Boolean,
    default: true,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// generating employeeId
employeeSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }
  const count = await mongoose.model("Employee").countDocuments();
  this.employeeId = `EMP-${count + 1}`;
  next();
});

// generating hashed password
employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

employeeSchema.method.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

employeeSchema.method.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
