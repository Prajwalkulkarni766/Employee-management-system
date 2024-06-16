import AppError from "../utils/appError";

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

export default restrictTo;
