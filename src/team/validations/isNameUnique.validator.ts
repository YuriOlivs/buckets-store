import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { TeamRepository } from "../team.repository";

@Injectable()
@ValidatorConstraint({ async: true })
export class isNameUniqueValidtor implements ValidatorConstraintInterface {
   constructor(private repository: TeamRepository) {}

   validate(value: any): Promise<boolean> | boolean {
       const teamFound: boolean = this.repository.getTeamByName(value);
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