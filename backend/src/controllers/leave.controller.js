import Leave from "../models/leave.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import AppResponse from "../utils/appResponse.js";

const getLeave = catchAsync(async (req, res, next) => {
  const leaves = await Leave.find();

  if (leaves.length <= 0) {
    return next(new AppError("Leave not found", 404));
  }

  return res.status(201).json(new AppResponse(201, leaves, undefined));
});

const createLeave = catchAsync(async (req, res, next) => {
  const { empId, leaveType, leaveReason, leaveStartDate, leaveEndDate } =
    req.body;

  // leave exists
  const existingLeave = await Leave.findOne({
    employee: empId,
    leaveStartDate: leaveStartDate,
    leaveEndDate: leaveEndDate,
  });

  if (existingLeave) {
    return next(new AppError("Already applied for leave", 409));
  }

  const leave = await new Leave({
    employee: empId,
    employeeName: "",
    leaveType,
    leaveReason,
    leaveStartDate,
    leaveEndDate,
    leaveDuration: leaveEndDate.getDate() - leaveStartDate.getDate(),
  }).save();

  return res
    .status(201)
    .json(new AppResponse(201, leave, "Applied for leave successfully"));
});

const updateLeave = catchAsync(async (req, res, next) => {
  const { leaveId, leaveType, leaveReason, leaveStartDate, leaveEndDate } =
    req.body;

  const leave = await Leave.findById(leaveId);

  // if leave not found
  if (!leave) {
    return next(new AppError("Leave not found", 404));
  }

  // if leave already Cancelled, Approved, Rejected
  if (leave.leaveStatus.includes("Approved", "Rejected", "Cancelled")) {
    return next(
      new AppError(
        "Leave that is Approved, Cancelled, Rejected can not be updated",
        400
      )
    );
  }

  // update leave
  leave.leaveType = leaveType || leave.leaveType;
  leave.leaveReason = leaveReason || leave.leaveReason;
  leave.leaveStartDate = leaveStartDate || leave.leaveStartDate;
  leave.leaveEndDate = leaveEndDate || leave.leaveEndDate;
  leave.leaveDuration = leaveEndDate.getDate() - leaveStartDate.getDate();

  await leave.save();

  return res
    .status(200)
    .json(new AppResponse(200, leave, "Leave updated successfully"));
});

const updateLeaveStatus = catchAsync(async (req, res, next) => {
  const { leaveId, leaveStatus } = req.body;

  const leave = await Leave.findByIdAndUpdate(leaveId, leaveStatus);

  // leave not found
  if (!leave) {
    return next(new AppError("Leave not found", 404));
  }

  return res
    .status(200)
    .json(new AppResponse(200, leave, "Leave updated successfully"));
});

export { getLeave, createLeave, updateLeave, updateLeaveStatus };
