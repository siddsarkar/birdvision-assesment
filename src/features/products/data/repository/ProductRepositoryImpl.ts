import { DummyJsonApiClient } from "@/features/products/data/datasource/remote/dummyjson/client/dummyJsonApiClient";
import { DummyJsonRemoteMapper } from "@/features/products/data/datasource/remote/dummyjson/DummyJsonRemoteMapper";
import { Product } from "@/features/products/domain/models/Product";
import type { ProductRepository } from "@/features/products/domain/repository/ProductRepository";

export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    private readonly apiClient: DummyJsonApiClient,
    private readonly remoteMapper: DummyJsonRemoteMapper
  ) {}

  async getProductById(id: number): Promise<Product> {
    const product = await this.apiClient.getProductById(id);
    return this.remoteMapper.toProduct(product);
  }

  async getProducts(skip?: number, limit?: number, search?: string) {
    const entities = await this.apiClient.getProducts(
      limit || 10,
      skip || 0,
      search
    );

    return {
      products: this.remoteMapper.toProducts(entities.products || []),
      total: entities.total || 0,
      skip: skip || 0,
      limit: limit || 10,
    };
  }
}
