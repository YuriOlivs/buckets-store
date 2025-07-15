import { Injectable, NotFoundException } from "@nestjs/common";
import ImageRepository from "./image.repository";
import ImageEntity from "./image.entity";

@Injectable()
export default class ImageService {
   constructor(private repo: ImageRepository) {}

   async createImage(image: ImageEntity | ImageEntity[]): Promise<ImageEntity | ImageEntity[]> {
      const images = Array.isArray(image) ? image : [image];
      const finalResults: ImageEntity[] = [];

      for (const img of images) {
         const existing = await this.repo.getByUrl(img.url);

         if (existing) {
            if (img.description != existing.description) existing.description = img.description;
            finalResults.push(existing);
         } else {
            const saved = await this.repo.save(img);
            finalResults.push(saved as ImageEntity);
         }
      }

      return Array.isArray(image) ? finalResults : finalResults[0];
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

   async getImagesByProduct(id: string): Promise<ImageEntity[] | null> {
      return await this.repo.getByProduct(id);
   }

   async deleteTeam(id: string): Promise<ImageEntity> {
      const imageFound = await this.repo.getById(id);
      if (!imageFound) throw new NotFoundException('Image not found');
      
      return await this.repo.remove(imageFound);
   }
}