import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserIdGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userIdParam = request.params.id;
    const userIdToken = request.user.id;

    if (userIdParam !== userIdToken) {
      throw new UnauthorizedException(`You don't have permission to access this resource.`);
    }

    return true;
  }
}
