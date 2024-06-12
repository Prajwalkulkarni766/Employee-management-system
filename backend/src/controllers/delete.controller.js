import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import AppResponse from "../utils/appResponse.js";

const deleteData = catchAsync(async (Model, id) => {
  const doc = await Model.findByIdAndDelete(id);

  //   if document not found
  if (!doc) {
    return next(new AppError("Data not found", 404));
  }

  return res
    .status(200)
    .json(new AppResponse(204, undefined, "Data deleted successfully"));
});

export default deleteData;
