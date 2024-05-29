// Throw ResponseError, ditangkap di Middleware, lalu dikonversi menjadi Error status dan message yang sesuai

export class ResponseError extends Error {
  // able for class to get arguments
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
