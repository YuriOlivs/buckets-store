import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import ImageEntity from "./image.entity";
import ImageRepository from "./image.repository";
import ImageService from "./image.service";

@Module({
   imports: [TypeOrmModule.forFeature([ImageEntity])],
   providers: [ImageService, ImageRepository],
   exports: [ImageService]
})
export class ImageModule {}