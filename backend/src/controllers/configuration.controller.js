import Configuration from "../models/configuration.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppResponse from "../utils/appResponse.js";
import AppError from "../utils/appError.js";
import fs, { unlink } from "fs";

const setConfiguration = catchAsync(async (req, res, next) => {
  const { body } = req;
  const configuration = await Configuration.findOne({});

  if (configuration) {
    Object.assign(configuration, body);
    await configuration.save();
    return res
      .status(200)
      .json(
        new AppResponse(
          200,
          configuration,
          "Configuration updated successfully"
        )
      );
  } else {
    const newConfiguration = await new Configuration(body).save();
    return res
      .status(200)
      .json(
        new AppResponse(
          201,
          newConfiguration,
          "Configuration created successfully"
        )
      );
  }
});

export { setConfiguration };
