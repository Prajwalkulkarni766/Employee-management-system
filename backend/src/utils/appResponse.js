class AppResponse {
  constructor(statusCode, data, message) {
    this.statusCode = statusCode;
    this.status = "success";
    this.data = data;
    this.message = message;
  }
}

export default AppResponse;
