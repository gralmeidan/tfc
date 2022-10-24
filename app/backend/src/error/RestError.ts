export default class RestError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}
