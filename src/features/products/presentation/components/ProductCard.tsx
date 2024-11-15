import { Product } from "@/features/products/domain/models/Product";

import {
  alpha,
  Box,
  CardContent,
  CardMedia,
  Chip,
  Paper,
  Rating,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomTextField = styled((props: TextFieldProps) => (
  <TextField {...props} />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: 4,
    border: "1px solid",
    backgroundColor: "#F3F6F9",
    borderColor: "#E0E3E7",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
      borderColor: "#2D3843",
    }),
  },
}));

const DiscountChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  position: "absolute",
  top: theme.spacing(1),
  left: theme.spacing(1),
  borderRadius: theme.spacing(0),
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "auto",
  scrollSnapType: "x mandatory",
  borderRadius: theme.spacing(0),

  "& img": {
    minWidth: "100%",
    objectFit: "contain",
    scrollSnapAlign: "start",
  },

  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const StyledCard = styled(Paper)(({ theme }) => ({
  position: "relative",
  margin: "auto",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: theme.spacing(0.5),
  maxWidth: theme.breakpoints.values.md,
}));

export const ProductCard = ({
  product,
  onClick,
  variant = "standard",
}: {
  product: Product;
  onClick?: () => void;
  variant?: "extended" | "standard";
}) => {
  const {
    title,
    images,
    description,
    price,
    discountPercentage,
    rating,
    brand,
  } = product;

  const discountedPrice = price! - (price! * discountPercentage!) / 100;

  const extendedVariant = variant === "extended";

  return (
    <StyledCard
      onClick={onClick}
      elevation={0}
      sx={{ cursor: onClick && "pointer", width: "100%" }}
    >
      {discountPercentage! > 0 && (
        <DiscountChip label={`-${discountPercentage}%`} />
      )}
      <CarouselContainer>
        {images?.map((img, index) => (
          <CardMedia
            key={index}
            component="img"
            image={img}
            alt={title}
            sx={{ height: extendedVariant ? 300 : 180, bgcolor: "#e7e3df" }}
          />
        ))}
      </CarouselContainer>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          px: 0,
        }}
      >
        <Stack
          sx={{
            height: "100%",
          }}
        >
          <Stack>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Stack>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    lineHeight: 1.22,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {title}
                </Typography>
                {brand && (
                  <Typography variant="subtitle2" color="text.secondary">
                    by {brand}
                  </Typography>
                )}
              </Stack>

              {!extendedVariant && (
                <Stack alignItems="flex-end">
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    ₹{discountedPrice.toFixed(2)}
                  </Typography>

                  {discountPercentage! > 0 && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textDecoration: "line-through", marginLeft: 1 }}
                    >
                      ₹{price!.toFixed(2)}
                    </Typography>
                  )}
                </Stack>
              )}
            </Stack>

            {extendedVariant && (
              <Typography
                variant="body2"
                color="text.secondary"
                mt={1}
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {description}
              </Typography>
            )}
          </Stack>
          {/* <Box flex={1} /> */}
          {extendedVariant && (
            <Stack>
              <Box display="flex" alignItems="center" mt={1}>
                <Rating value={rating} precision={0.5} readOnly size="small" />
                <Typography variant="body2" color="text.secondary" ml={1}>
                  {rating}
                </Typography>
              </Box>
              <Box display="flex" alignItems="baseline" mt={1}>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  ₹{discountedPrice.toFixed(2)}
                </Typography>
                {discountPercentage! > 0 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through", marginLeft: 1 }}
                  >
                    ₹{price!.toFixed(2)}
                  </Typography>
                )}
              </Box>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </StyledCard>
  );
};
