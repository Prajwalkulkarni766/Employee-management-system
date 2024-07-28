import mongoose, { Schema, model } from "mongoose";
import Configuration from "./configuration.model.js";

const attendanceSchema = new Schema({
  employeeId: {
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
  checkIn: {
    type: Date,
  },
  checkOut: {
    type: Date,
  },
  workingHours: {
    type: String,
  },
  workingStatus: {
    type: String,
    enum: [
      "Overtime",
      "Present",
      "Almost Present",
      "Half Day",
      "Not Considerable",
      "Absent",
      "Holiday",
      "Leave",
      "",
    ],
  },
  isLate: {
    type: Boolean,
  },
  shift: {
    type: String,
    enum: ["Day shift", "Night shift"],
  },
});

// Function to calculate working hours and status
attendanceSchema.methods.calculateWorkingHoursStatus = async function () {
  if (this.checkIn && this.checkOut) {
    let diffMilliseconds = this.checkOut.getTime() - this.checkIn.getTime();
    let workingHours = Math.floor(diffMilliseconds / (1000 * 60 * 60));
    let workingMinutes = Math.floor(
      (diffMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );

    const configuration = await Configuration.findOne();

    if (workingHours >= configuration.overTimeWorkingHours) {
      this.workingStatus = "Overtime";
    } else if (workingHours >= configuration.totalWorkingHours) {
      this.workingStatus = "Present";
    } else if (
      workingHours < configuration.totalWorkingHours &&
      workingHours > configuration.halfDayWorkingHours
    ) {
      this.workingStatus = "Almost Present";
    } else if (workingHours === configuration.halfDayWorkingHours) {
      this.workingStatus = "Half Day";
    } else {
      this.workingStatus = "Not Considerable";
    }
    this.workingHours = `${workingHours}:${workingMinutes}`;
  }
};

// Function to get absent employee IDs for a date
// attendanceSchema.statics.getAbsentEmployeeIds = async function (date) {
//   const existingAttendance = await this.find({ date: date.toISOString() });
//   const allEmployees = await mongoose.model("Employee").find();
//   const absentEmployeeIds = [];

//   for (const employee of allEmployees) {
//     let found = false;
//     for (const attendance of existingAttendance) {
//       if (attendance.employee.toString() === employee._id.toString()) {
//         found = true;
//         break;
//       }
//     }
//     if (!found) {
//       absentEmployeeIds.push(employee._id);
//     }
//   }

//   return absentEmployeeIds;
// };

attendanceSchema.pre("save", function (next) {
  this.calculateWorkingHoursStatus();
  next();
});

// attendanceSchema.post("save", function (doc, next) {
//   this.checkLateForWorkOrNot();
//   next();
// });

const Attendance = model("Attendance", attendanceSchema);

export default Attendance;
