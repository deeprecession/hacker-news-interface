import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/HomePage.tsx";
import ProductPage from "./pages/product/ProductPage.tsx";
import { productLoader } from "./pages/product/productLoader.ts";
import Catalog from "./pages/catalog/CatalogPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/catalog",
    element: <Catalog />,
  },
  {
    path: "/products/:productId",
    loader: productLoader,
    element: <ProductPage />,
  },
]);
