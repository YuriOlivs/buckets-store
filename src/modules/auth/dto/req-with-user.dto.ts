import { Request } from 'express';
import UserPayload from './user-payload.dto';

export default interface RequestWithUser extends Request {
   user: UserPayload
}