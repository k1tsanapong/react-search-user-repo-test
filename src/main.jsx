import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageHome from "./PageHome";
import Page404 from "./Page404";
import PageUser from "./PageUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageHome />,
    errorElement: <Page404 />,
  },
  {
    path: "/users/:login",
    element: <PageUser />,
  },
  // ส่วนของ path และ element เราสามารถเพิ่มมาอีกได้เรื่อย ๆ กรณีที่เรามีหลายเพจ
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
