import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 16 16%22%3E%3Cpath fill=%22%23f3f4f6%22 fill-opacity=%22.4%22 d=%22M8 0h8v8H8zM0 8h8v8H0z%22/%3E%3C/svg%3E')",
          pointerEvents: "none",
        }}
      />
      <Outlet />
    </>
  );
}
