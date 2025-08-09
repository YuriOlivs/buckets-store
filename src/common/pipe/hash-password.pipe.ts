import { Injectable, PipeTransform } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
   constructor(private configService: ConfigService) {}

   async transform(password: string) {
      const salt = this.configService.get<string>('PASSWORD_SALT');
      const hashedPassword = await bcrypt.hash(password, salt!);
      return hashedPassword;
   }
}