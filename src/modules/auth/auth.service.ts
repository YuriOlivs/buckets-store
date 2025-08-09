import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import UserService from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login({ email, password }: AuthDTO) {
    let authenticated: boolean = false;
    const user = await this.userService.findByEmail(email);

    if (user) authenticated = await bcrypt.compare(password, user.password);

    if (!authenticated) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const payload: UserPayload = {
      sub: user!.id,
      userName: `${user!.name} ${user!.lastName}`
    }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
