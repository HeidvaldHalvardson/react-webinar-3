import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../app/main";
import ErrorPage from "../app/error";
import CatalogItem from "../app/catalog-item";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/1" replace />,
  },
  {
    path: '/:catalogPage',
    element: <Main />,
  },
  {
    path: '/catalog/:itemId',
    element: <CatalogItem />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  }
]);

export default router;
