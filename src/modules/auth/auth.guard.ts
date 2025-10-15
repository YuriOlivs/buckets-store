import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import UserPayload from './dto/user-payload.dto';
import { JwtService } from '@nestjs/jwt';
import RequestWithUser from './dto/req-with-user.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.getToken(req);

    if (!token) {
      throw new UnauthorizedException('Access token not found');
    }

    try {
      const payload: UserPayload = await this.jwtService.verifyAsync(token);
      req.user = payload;
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Invalid access token');
    }

    return true;
  }

  private getToken(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
