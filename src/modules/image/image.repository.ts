import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import ImageEntity from "./image.entity";
import { Repository } from "typeorm";

@Injectable()
export default class ImageRepository {
   constructor(
      @InjectRepository(ImageEntity)
      private readonly repository: Repository<ImageEntity>,
   ) {}

   async save(image: ImageEntity | ImageEntity[]): Promise<ImageEntity | ImageEntity[]> {
      if (Array.isArray(image)) {
         return await this.repository.save(image);
      }
      return await this.repository.save(image);
   }

   async getById(id: string): Promise<ImageEntity | null> {
      return await this.repository.findOne({ where: { id } });
   }

   async getByUrl(url: string): Promise<ImageEntity | null> {
      return await this.repository.findOne({ where: { url } });
   }

   async getByTeam(id: string): Promise<ImageEntity | null> {
      return await this.repository.findOne({ where: { team: { id: id } } });
   }

   async getByProduct(id: string): Promise<ImageEntity[] | null> {
      return await this.repository.find({ where: { product: { id: id } } });
   }

   async remove(image: ImageEntity): Promise<ImageEntity> {
      return await this.repository.remove(image);
   }
}