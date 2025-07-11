import ImageDTO from "./dto/Image.dto";

export default class ProductEntity {
   private id: string;
   private name: string;
   private description: string;
   private category: string;
   private subcategory: string;
   private price: number;
   private team: string;
   private images: ImageDTO[];

   constructor(
      id: string,
      name: string,
      description: string,
      category: string,
      subcategory: string,
      price: number,
      team: string,
      images: ImageDTO[]
   ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.category = category;
      this.subcategory = subcategory;
      this.price = price;
      this.team = team;
      this.images = images;
   }

   get getId() { return this.id; }
   get getName() { return this.name; }
   get getDescription() { return this.description; }
   get getCategory() { return this.category; }
   get getSubcategory() { return this.subcategory; }
   get getPrice() { return this.price; }
   get getTeam() { return this.team; }
   get getImages() { return this.images; }

   setId(id: string) { this.id = id; }
   setName(name: string) { this.name = name; }
   setDescription(description: string) { this.description = description; }
   setCategory(category: string) { this.category = category; }
   setSubcategory(subcategory: string) { this.subcategory = subcategory; }
   setPrice(price: number) { this.price = price; }
   setTeam(team: string) { this.team = team; }
   setImages(images: ImageDTO[]) { this.images = images; }
}