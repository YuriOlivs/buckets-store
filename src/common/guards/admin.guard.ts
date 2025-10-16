import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import RequestWithUser from 'src/modules/auth/dto/req-with-user.dto';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated.');
    }

    if (user.role === "ADMIN") {
      return true;
    }

    throw new ForbiddenException("You don't have permission to access this resource.");
  }
}
