import { Layout } from "./components/Layout/Layout";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { StorePage } from "./pages/StorePage/StorePage";
import { CartPage } from "./pages/CartPage/CartPage";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/store",
        element: <StorePage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/*",
        element: <ErrorPage />,
      },
    ],
  },
];
