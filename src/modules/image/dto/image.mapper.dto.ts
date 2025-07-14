import ImageEntity from "../image.entity";
import ImageResponseDTO from "./ImageResponse.dto";

export default class ImageMapper {
   static toDTO(image: ImageEntity): ImageResponseDTO {
      return new ImageResponseDTO(
         image.id, 
         image.url, 
         image.desc
      );
   }
}