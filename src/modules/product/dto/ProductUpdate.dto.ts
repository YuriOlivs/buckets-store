import { PartialType } from "@nestjs/mapped-types";
import ProductCreateDTO from "./ProductCreate.dto";

export default class ProductUpdateDTO extends PartialType(ProductCreateDTO) {}