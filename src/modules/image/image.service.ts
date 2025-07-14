import { Injectable, NotFoundException } from "@nestjs/common";
import ImageRepository from "./image.repository";
import ImageEntity from "./image.entity";

@Injectable()
export default class ImageService {
   constructor(private repo: ImageRepository) {}

   async createImage(image: ImageEntity): Promise<ImageEntity> {
      return await this.repo.save(image);
   }

   async getImageById(id: string): Promise<ImageEntity | null> {
      return await this.repo.getById(id);
   }

   async getImageByUrl(url: string): Promise<ImageEntity | null> {
      return await this.repo.getByUrl(url);
   }

   async getImageByTeam(id: string): Promise<ImageEntity | null> {
      return await this.repo.getByTeam(id);
   }

   async deleteTeam(id: string): Promise<ImageEntity> {
      const imageFound = await this.repo.getById(id);
      if (!imageFound) throw new NotFoundException('Image not found');
      
      return await this.repo.remove(imageFound);
   }
}