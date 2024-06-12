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
      "Overtime",
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

// Function to calculate working hours and status
attendanceSchema.methods.calculateWorkingHoursStatus = function () {
  if (this.clockIn && this.clockOut) {
    let diffMilliseconds = this.clockOut.getTime() - this.clockIn.getTime();
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
