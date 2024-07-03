import Leave from "../models/leave.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import AppResponse from "../utils/appResponse.js";
import Employee from "../models/employee.model.js";

const getLeave = catchAsync(async (req, res, next) => {
  const { fromDate, toDate } = req.query;

  let leaves = await Leave.find({
    createdAt: {
      $gte: fromDate,
      $lte: toDate,
    },
  });

  leaves = leaves.map((leaveData, index) => ({
    id: index + 1,
    ...leaveData.toJSON(),
  }));

  return res.status(200).json(new AppResponse(200, leaves));
});

const createLeave = catchAsync(async (req, res, next) => {
  const { empId, leaveStartDate, leaveEndDate } = req.body;

  // leave exists
  const existingLeave = await Leave.findOne({
    employee: empId,
    leaveStartDate: leaveStartDate,
    leaveEndDate: leaveEndDate,
  });

  if (existingLeave) {
    return next(new AppError("Already applied for leave", 409));
  }

  const leave = await new Leave(req.body).save();

  return res
    .status(201)
    .json(new AppResponse(201, leave, "Applied for leave successfully"));
});

const updateLeave = catchAsync(async (req, res, next) => {
  const { leaveId, leaveStatus } = req.body;

  let leave = await Leave.findById(leaveId);

  // leave not found
  if (!leave) {
    return next(new AppError("Leave not found", 404));
  }

  // dont update it it is already approved or cancelled
  if (
    leave &&
    (leave.leaveStatus === "Approved" || leave.leaveStatus === "Cancelled")
  ) {
    return next(
      new AppError("Approved or cancelled leave cannot be updated", 400)
    );
  }

  leave = await Leave.updateOne(req.body);

  return res
    .status(200)
    .json(new AppResponse(200, leave, "Leave updated successfully"));
});

export { getLeave, createLeave, updateLeave };
