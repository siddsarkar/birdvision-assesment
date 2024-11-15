import MapperException from "@/core/exceptions/MapperException";
import { ProductDTO } from "@/features/products/data/datasource/remote/dummyjson/dto/ProductDto";
import { Product } from "@/features/products/domain/models/Product";

export class DummyJsonRemoteMapper {
  toProduct(product: ProductDTO): Product {
    try {
      return new Product({
        id: product.id!,
        title: product.title!,
        description: product.description,
        category: product.category,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        brand: product.brand,
        images: product.images,
      });
    } catch (error) {
      throw new MapperException(error);
    }
  }

  toProducts(products: ProductDTO[]): Product[] {
    const productsList: Product[] = [];

    for (const product of products) {
      try {
        productsList.push(this.toProduct(product));
      } catch (error) {
        console.error("Error mapping product", product, error);
      }
    }

    return productsList;
  }
}
