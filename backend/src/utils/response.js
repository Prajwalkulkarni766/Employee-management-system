const sendResponse = (res, statusCode, successStatus, message, data) => {
  return res
  .status(statusCode)
  .json({
    success: successStatus,
    message: message,
    data: data,
  });
};

export { sendResponse };
