import mongoose, { Schema, model } from "mongoose";

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
  shift: {
    type: String,
    enum: ["Day shift", "Night shift"],
  },
});

// Function to calculate working hours and status
attendanceSchema.methods.calculateWorkingHoursStatus = function () {
  if (this.checkIn && this.checkOut) {
    let diffMilliseconds = this.checkOut.getTime() - this.checkIn.getTime();
    let workingHours = Math.floor(diffMilliseconds / (1000 * 60 * 60));
    let workingMinutes = Math.floor(
      (diffMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );
    this.workingHours = `${workingHours}:${workingMinutes}`;

    if (workingHours > 8) {
      this.workingStatus = "Overtime";
    } else if (workingHours === 8) {
      this.workingStatus = "Present";
    } else if (workingHours < 8 && workingHours > 5) {
      this.workingStatus = "Almost Present";
    } else if (workingHours <= 5 && workingHours >= 4) {
      this.workingStatus = "Half Day";
    } else {
      this.workingStatus = "Not Considerable";
    }
  }
};

// Function to get absent employee IDs for a date
attendanceSchema.statics.getAbsentEmployeeIds = async function (date) {
  const existingAttendance = await this.find({ date: date.toISOString() });
  const allEmployees = await mongoose.model("Employee").find();
  const absentEmployeeIds = [];

  for (const employee of allEmployees) {
    let found = false;
    for (const attendance of existingAttendance) {
      if (attendance.employee.toString() === employee._id.toString()) {
        found = true;
        break;
      }
    }
    if (!found) {
      absentEmployeeIds.push(employee._id);
    }
  }

  return absentEmployeeIds;
};

attendanceSchema.pre("save", function (next) {
  this.calculateWorkingHoursStatus();
  next();
});

const Attendance = model("Attendance", attendanceSchema);

export default Attendance;
