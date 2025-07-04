export default class UserEntity {
   private id: string;
   private name: string;
   private lastName: string;
   private email: string;
   private password: string;
   private birthDate: Date;

   constructor(
      id: string, 
      name: string, 
      lastName: string, 
      email: string, 
      password: string, 
      birthDate: Date
   ) {
      this.id = id;
      this.name = name;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.birthDate = birthDate;
   }

   get getId() { return this.id; }
   get getName() { return this.name; }
   get getLastName() { return this.lastName; }
   get fullName() { return `${this.name} ${this.lastName}`; }
   get getEmail() { return this.email; }
   get getPassword() { return this.password; }
   get getBirthDate() { return this.birthDate; }

   //setId(id: string) { this.id = id; }
   setName(name: string) { this.name = name; }
   setLastName(lastName: string) { this.lastName = lastName; }
   setEmail(email: string) { this.email = email; }
   setPassword(password: string) { this.password = password; }
   setBirthDate(birthDate: Date) { this.birthDate = birthDate; }
}
