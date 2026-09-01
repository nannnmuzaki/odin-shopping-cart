import { Layout } from "./components/Layout/Layout";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { HomePage } from "./pages/HomePage";

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
        path: "/*",
        element: <ErrorPage />,
      },
    ],
  },
];
