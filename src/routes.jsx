import { Layout } from "./components/Layout/Layout";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { StorePage } from "./pages/StorePage/StorePage";

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
        path: "/*",
        element: <ErrorPage />,
      },
    ],
  },
];
