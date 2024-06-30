import Holiday from "../models/holiday.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppResponse from "../utils/appResponse.js";
import AppError from "../utils/appError.js";

const getHoliday = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  const holiday = await Holiday.find(req.query).skip(skip).limit(limit);

  return res.status(200).json(new AppResponse(200, holiday));
});

const isExistHoliday = catchAsync(async (req, res, next) => {
  const { date } = req.body;

  const holiday = await Holiday.findOne({ date });

  if (holiday) {
    return next(new AppError("Holiday already exists on this date", 409));
  }

  next();
});

const createHoliday = catchAsync(async (req, res, next) => {
  const holiday = await Holiday.create(req.body);

  return res
    .status(201)
    .json(new AppResponse(201, holiday, "Holiday created successfully"));
});

const updateHoliday = catchAsync(async (req, res, next) => {
  const { holidayId } = req.body;

  const holiday = await Holiday.findOneAndUpdate({ holidayId }, req.body, {
    new: true,
  });

  if (!holiday) {
    return next(new AppError("Holiday does not exists", 400));
  }

  return res
    .status(200)
    .json(new AppResponse(200, holiday, "Holiday updated successfully"));
});

const deleteHoliday = catchAsync(async (req, res, next) => {
  const { holidayId } = req.query;

  const holiday = await Holiday.findOneAndDelete({ holidayId });

  if (!holiday) {
    return next(new AppError("Holiday not found", 400));
  }

  return res
    .status(204)
    .send(new AppResponse(204, undefined, "Holiday deleted successfully"));
});

export {
  getHoliday,
  createHoliday,
  updateHoliday,
  deleteHoliday,
  isExistHoliday,
};
