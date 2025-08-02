import { PartialType } from "@nestjs/mapped-types";
import ProductCreateDTO from "./product-create.dto";

export default class ProductUpdateDTO extends PartialType(ProductCreateDTO) { }