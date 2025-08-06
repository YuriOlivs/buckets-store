export default class HttpResponse {
   statusCode: number;
   message: string;
   payload: any;

   constructor(statusCode: number, message: string, payload: any) {
      this.statusCode = statusCode;
      this.message = message;
      this.payload = payload;
   }
}