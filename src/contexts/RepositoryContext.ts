import { DummyJsonApiClient } from "@/features/products/data/datasource/remote/dummyjson/client/dummyJsonApiClient";
import { DummyJsonRemoteMapper } from "@/features/products/data/datasource/remote/dummyjson/DummyJsonRemoteMapper";
import { ProductRepositoryImpl } from "@/features/products/data/repository/ProductRepositoryImpl";
import type { ProductRepository } from "@/features/products/domain/repository/ProductRepository";

import { createContext } from "react";

const apiClient = new DummyJsonApiClient();
const remoteMapper = new DummyJsonRemoteMapper();
const repository = new ProductRepositoryImpl(apiClient, remoteMapper);

export const RepositoryContext = createContext<ProductRepository>(repository);
