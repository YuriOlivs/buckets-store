import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@Injectable()
@ValidatorConstraint({ async: false })
export class IsNotPastDateValidator implements ValidatorConstraintInterface {
   validate(value: any): Promise<boolean> | boolean {
      if (!(value instanceof Date)) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return value >= today;
   }
}

export const IsNotPastDate = (
   validationOptions: ValidationOptions = { message: 'Start date must be greater or equal than current date' }
) => {
   return (object: object, propertyName: string) => {
      registerDecorator({
         target: object.constructor,
         propertyName: propertyName,
         options: validationOptions,
         constraints: [],
         validator: IsNotPastDateValidator
      })
   }
}