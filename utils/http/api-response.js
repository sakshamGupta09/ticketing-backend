class HttpResponse {
  constructor(statusCode, message, data = {}) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

class HttpErrorResponse {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = { HttpResponse, HttpErrorResponse };
