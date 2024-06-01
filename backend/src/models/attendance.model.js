import mongoose, { Schema, model } from "mongoose";

const attendanceSchema = new Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    required: true,
  },
  clockIn: {
    type: Date,
  },
  clockInCoordinates: {
    type: Object,
  },
  clockOut: {
    type: Date,
  },
  clockOutCoordinates: {
    type: Object,
  },
  workingHours: {
    type: String,
  },
  workingStatus: {
    type: String,
    enum: [
      "Present",
      "Almost Present",
      "Half Day",
      "Not Considerable",
      "Absent",
      "Holiday",
      "",
    ],
  },
});

const Attendance = model("Attendance", attendanceSchema);

export default Attendance;
