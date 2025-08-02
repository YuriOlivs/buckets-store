import ImageEntity from "../image.entity";
import ImageResponseDTO from "./image-response.dto";

export default class ImageMapper {
   static toDTO(image: ImageEntity): ImageResponseDTO {
      return new ImageResponseDTO(
         image.id,
         image.url,
         image.description
      );
   }
}