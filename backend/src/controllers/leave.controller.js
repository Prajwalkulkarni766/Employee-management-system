import Leave from "../models/leave.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import AppResponse from "../utils/appResponse.js";

const getLeave = catchAsync(async (req, res, next) => {});

const createLeave = catchAsync(async (req, res, next) => {
  const { empId, leaveType, leaveReason, leaveStartDate, leaveEndDate } =
    req.body;

  // check already applied for leave on that date by user if yes then return error

  // count previous leaves present in this particular year and determine if count of document is less than total given leaves then mark is paid as true other wise false

  // calculate leave duration

  // save the document
});

const updateLeave = catchAsync(async (req, res, next) => {
  // update leave by user
});

const updateLeaveStatus = catchAsync(async (req, res, next) => {
  // this route is restricted to only admin
});

export { getLeave, createLeave, updateLeave, deleteLeave, updateLeaveStatus };
