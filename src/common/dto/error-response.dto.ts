export default class ErrorResponse {
   statusCode: number;
   message: string | string[];
   timestamp: string;
   path: string;

   constructor(statusCode: number, message: string | string[], path: string) {
      this.statusCode = statusCode;
      this.message = message;
      this.timestamp = new Date().toISOString();
      this.path = path;
   }
}