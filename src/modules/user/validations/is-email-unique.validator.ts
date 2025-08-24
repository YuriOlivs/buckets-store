import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { STRINGS } from "src/common/strings/global.strings";
import UserRepository from "../user.repository";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUniqueValidator implements ValidatorConstraintInterface {
   constructor(private repository: UserRepository) { }

   async validate(value: any): Promise<boolean> {
      const userFound = await this.repository.findByEmail(value);
      return !userFound;
   }
}

export const IsEmailUnique = (
   validationOptions: ValidationOptions = { message: STRINGS.alreadyExists('Email') }
) => {
   return (object: object, propertyName: string) => {
      registerDecorator({
         target: object.constructor,
         propertyName: propertyName,
         options: validationOptions,
         constraints: [],
         validator: IsEmailUniqueValidator
      })
   }
}