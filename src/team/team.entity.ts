export default class TeamEntity {
   private id: string;
   private name: string;
   private city: string;

   constructor(id: string, name: string, city: string) {
      this.id = id;
      this.name = name;
      this.city = city;
   }

   get getId() { return this.id; }
   get getName() { return this.name; }
   get getCity() { return this.city; }

   setId(id: string) { this.id = id; }
   setName(name: string) { this.name = name; }
   setCity(city: string) { this.city = city; }
}