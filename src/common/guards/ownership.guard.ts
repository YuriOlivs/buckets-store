import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { STRINGS } from '../strings/global.strings';
import RequestWithUser from 'src/modules/auth/dto/req-with-user.dto';

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    // const request = context.switchToHttp().getRequest<RequestWithUser>();
    // const userIdParam = request.params.id;
    // const userIdToken = request.user.sub;
    
    // if (userIdParam !== userIdToken) {
    //   throw new ForbiddenException(STRINGS.notAuthorized());
    // }

    return true;
  }
}
