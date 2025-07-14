import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import TeamRepository from "../team.repository";

@Injectable()
@ValidatorConstraint({ async: true })
export class isNameUniqueValidtor implements ValidatorConstraintInterface {
   constructor(private repository: TeamRepository) {}

   async validate(value: any): Promise<boolean> {
       const teamFound = await this.repository.getByName(value);
       return !teamFound;
   }
}

export const IsNameUnique = (
   validationOptions: ValidationOptions = { message: 'Team already exists' }
) => {
   return (object: object, propertyName: string) => {
      registerDecorator({
         target: object.constructor,
         propertyName: propertyName,
         options: validationOptions,
         constraints: [],
         validator: isNameUniqueValidtor
      })
   }
}  