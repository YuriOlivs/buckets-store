import { registerDecorator, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
import RoleRepository from "../role.repository";
import { STRINGS } from "src/common/strings/global.strings";

export class IsRoleNameUniqueValidator implements ValidatorConstraintInterface {
   constructor (private repository: RoleRepository) { }

   async validate(value: any): Promise<boolean> {
      const roleFound = await this.repository.findByName(value);
      return !roleFound;
   }
}

export const IsRoleNameUnique = (
   validationOptions: ValidationOptions = { message: STRINGS.alreadyExists('Role') }
) => {
   return (object: object, propertyName: string) => {
      registerDecorator({
         target: object.constructor,
         propertyName: propertyName,
         options: validationOptions,
         constraints: [],
         validator: IsRoleNameUniqueValidator
      })
   }
}