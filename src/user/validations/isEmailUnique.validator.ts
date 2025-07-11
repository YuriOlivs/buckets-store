import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import UserRepository from "../user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUniqueValidator implements ValidatorConstraintInterface {
   constructor(private repository: UserRepository) {}

   validate(value: any): Promise<boolean> | boolean{
      const userFound = this.repository.getByEmail(value);
      return !userFound;
   }
}

export const IsEmailUnique = (
   validationOptions: ValidationOptions = { message: 'Email already exists' }
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