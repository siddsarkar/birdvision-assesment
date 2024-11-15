import { RepositoryContext } from "@/contexts/RepositoryContext";
import { Product } from "@/features/products/domain/models/Product";
import {
  CustomTextField,
  ProductCard,
} from "@/features/products/presentation/components/ProductCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

import { Close } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  CircularProgress,
  Container,
  debounce,
  Grid2,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

export function ProductsGallery() {
  const repository = useContext(RepositoryContext);

  const navigate = useNavigate();

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [setElement] = useInfiniteScroll(() => {
    if (page < total / PAGE_SIZE || 0) {
      setPage((prevPage) => prevPage + 1);
    }
  });

  async function fetchProducts(query?: string) {
    setPage(1);
    setIsLoading(true);

    const { products, total } = await repository.getProducts(0, 10, query);

    setProducts(products);
    setTotal(total);
    setIsLoading(false);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchProducts = useCallback(debounce(fetchProducts, 500), []);

  useEffect(() => {
    fetchProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (page > 1) {
      console.log("loading more data...", { page });
      setIsLoadingMore(true);

      async function fetchMoreProducts() {
        if (page > total / PAGE_SIZE || 0) {
          setIsLoadingMore(false);
          return;
        }

        const { products: newProducts } = await repository.getProducts(
          (page - 1) * PAGE_SIZE,
          PAGE_SIZE,
          query
        );

        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setIsLoadingMore(false);
      }

      fetchMoreProducts();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Container maxWidth="lg">
      <Stack pt={12} maxWidth="sm" mx="auto">
        <CustomTextField
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            debouncedFetchProducts(e.target.value);
          }}
          label="Search for Products"
          id="reddit-input"
          variant="filled"
          placeholder="e.g. iPhone 13, Nike Shoes"
          slotProps={{
            input: {
              disableUnderline: true,
              startAdornment: (
                <Box sx={{ mt: 3 }}>
                  <SearchIcon sx={{ color: "text.secondary" }} />
                </Box>
              ),
              endAdornment: query && (
                <Box sx={{ mt: 2 }}>
                  {query !== "" &&
                    (isLoading ? (
                      <CircularProgress
                        size={11}
                        sx={{ color: "text.secondary" }}
                      />
                    ) : (
                      <IconButton
                        size="small"
                        sx={{ p: 0 }}
                        onClick={() => {
                          setQuery("");
                          fetchProducts();
                        }}
                      >
                        <Close sx={{ color: "text.secondary" }} />
                      </IconButton>
                    ))}
                </Box>
              ),
            },
          }}
          sx={{
            "& .MuiInputBase-input": {
              paddingLeft: 1,
            },
          }}
        />
      </Stack>

      {!isLoading && query !== "" ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            {total === 0 ? (
              "No results found for"
            ) : (
              <>
                Showing <strong>{total}</strong> results for
              </>
            )}
            : <strong>{query}</strong>
          </Typography>
        </Box>
      ) : (
        <Box height={200} />
      )}

      <Grid2 container rowSpacing={1} columnSpacing={2}>
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
          products.map((product) => (
            <Grid2
              key={product.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }}
            >
              <ProductCard
                onClick={() => {
                  navigate(`/gallery/product/${product.id}`);
                }}
                product={product}
              />
            </Grid2>
          ))
        )}
      </Grid2>

      {isLoadingMore ? (
        <Box maxWidth="lg" mx="auto" sx={{ pt: 2 }}>
          <CircularProgress size={11} />
        </Box>
      ) : (
        <div
          ref={setElement}
          style={{ height: "20px", backgroundColor: "transparent" }}
        />
      )}

      {/* Modal */}
      <Outlet />
    </Container>
  );
}
