import { ProductDTO } from "@/features/products/data/datasource/remote/dummyjson/dto/ProductDto";

export interface ProductsListDTO {
  products?: ProductDTO[];
  total?: number;
  skip?: number;
  limit?: number;
}
