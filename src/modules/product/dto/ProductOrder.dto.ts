import { PickType } from "@nestjs/mapped-types";
import ProductEntity from "../product.entity";

export default class ProductOrderDTO extends PickType(ProductEntity, ['id']) {}