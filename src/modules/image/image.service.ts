import { Injectable, NotFoundException } from "@nestjs/common";
import { STRINGS } from "src/common/strings/global.strings";
import ImageEntity from "./image.entity";
import ImageRepository from "./image.repository";

@Injectable()
export default class ImageService {
   constructor(private repo: ImageRepository) { }

   async create(image: ImageEntity | ImageEntity[]): Promise<ImageEntity | ImageEntity[]> {
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

   async findById(id: string): Promise<ImageEntity | null> {
      return await this.repo.getById(id);
   }

   async findByUrl(url: string): Promise<ImageEntity | null> {
      return await this.repo.getByUrl(url);
   }

   async findByTeam(id: string): Promise<ImageEntity | null> {
      return await this.repo.getByTeam(id);
   }

   async findByProduct(id: string): Promise<ImageEntity[] | null> {
      return await this.repo.getByProduct(id);
   }

   async delete(id: string): Promise<ImageEntity> {
      const imageFound = await this.repo.getById(id);
      if (!imageFound) throw new NotFoundException(STRINGS.notFound('Image'));

      return await this.repo.remove(imageFound);
   }
}