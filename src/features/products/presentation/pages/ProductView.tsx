import { RepositoryContext } from "@/contexts/RepositoryContext";
import { Product } from "@/features/products/domain/models/Product";
import { ProductCard } from "@/features/products/presentation/components/ProductCard";

import { Box, CircularProgress, Drawer } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function ProductView() {
  const repository = useContext(RepositoryContext);
  const navigate = useNavigate();

  const { id } = useParams<"id">();

  function onDismiss() {
    navigate(-1);
  }

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      const product = await repository.getProductById(Number(id));
      console.log({ product });
      setProduct(product);
      setIsLoading(false);
    }

    fetchProduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Drawer
      open
      anchor="bottom"
      aria-labelledby="label"
      onClose={onDismiss}
      sx={{
        "& .MuiDrawer-paper": {
          height: "90%",
          width: "100%",
          maxWidth: "100%",
          padding: 2,
        },
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
            width: "100%",
          }}
        >
          <CircularProgress size={11} />
        </Box>
      ) : (
        <ProductCard variant="extended" product={product!} />
      )}
    </Drawer>
  );
}
