import { MainLayout } from "@/features/products/presentation/layouts/MainLayout";
import { HomePage } from "@/features/products/presentation/pages/HomePage";
import { ProductsGallery } from "@/features/products/presentation/pages/ProductsGallery";
import { ProductView } from "@/features/products/presentation/pages/ProductView";

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "gallery",
        Component: ProductsGallery,
        children: [
          {
            path: "product/:id",
            Component: ProductView,
          },
        ],
      },
    ],
  },
]);
