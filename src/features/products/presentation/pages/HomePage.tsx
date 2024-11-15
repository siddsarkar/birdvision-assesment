import { Box, Container, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export function HomePage() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" gutterBottom textAlign="center">
          This is my submission for the{" "}
          <strong>
            "Frontend Engineer - Technical Assessment by Birdvision"
          </strong>{" "}
          challenge.
        </Typography>

        <Typography
          color="primary"
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          component={Link}
          to={`/gallery`}
        >
          Click here to view the App
        </Typography>
      </Box>
      <Outlet />
    </Container>
  );
}
