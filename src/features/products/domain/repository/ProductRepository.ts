import { Product } from "@/features/products/domain/models/Product";

export interface ProductRepository {
  getProducts(
    skip?: number,
    limit?: number,
    search?: string
  ): Promise<{
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }>;

  getProductById(id: number): Promise<Product>;
}
