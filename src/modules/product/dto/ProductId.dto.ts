import { PickType } from "@nestjs/mapped-types";
import ProductEntity from "../product.entity";

export default class ProductIdDTO extends PickType(ProductEntity, ['id']) { }