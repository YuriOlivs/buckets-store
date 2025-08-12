import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { STRINGS } from '../strings/global.strings';

@Injectable()
export class UserIdGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userIdParam = request.params.id;
    const userIdToken = request.user.id;

    if (userIdParam !== userIdToken) {
      throw new ForbiddenException(STRINGS.notAuthorized());
    }

    return true;
  }
}
