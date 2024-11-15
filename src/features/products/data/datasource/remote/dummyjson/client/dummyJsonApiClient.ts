import { ProductDTO } from "@/features/products/data/datasource/remote/dummyjson/dto/ProductDto";
import { ProductsListDTO } from "@/features/products/data/datasource/remote/dummyjson/dto/ProductsListDto";

export class DummyJsonApiClient {
  async getProducts(
    limit: number,
    skip: number,
    search?: string
  ): Promise<ProductsListDTO> {
    const url = search
      ? `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${search}`
      : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    const response = await fetch(url);
    const json = await response.json();

    return json as ProductsListDTO;
  }

  async getProductById(id: number): Promise<ProductDTO> {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const json = await response.json();

    return json as ProductDTO;
  }
}
