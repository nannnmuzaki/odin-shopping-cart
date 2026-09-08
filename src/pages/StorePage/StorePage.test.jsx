import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Outlet, RouterProvider, createMemoryRouter } from "react-router";
import { StorePage } from "./StorePage";

const mockProducts = [
  {
    id: 1,
    title: "Fjallraven Backpack",
    price: 109.95,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  },
];

function renderStorePageWithContext(contextValue = { cartItems: [], setCartItems: vi.fn() }) {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <Outlet context={contextValue} />,
        children: [
          {
            index: true,
            element: <StorePage />,
          },
        ],
      },
    ],
    { initialEntries: ["/"] },
  );

  return render(<RouterProvider router={router} />);
}

describe("StorePage Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("displays loading state and then renders products on fetch success", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });

    renderStorePageWithContext({ setCartItems: vi.fn() });

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Fjallraven Backpack")).toBeInTheDocument();
    });
  });

  it("displays error message when fetch fails", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    renderStorePageWithContext({ setCartItems: vi.fn() });

    await waitFor(() => {
      expect(screen.getByText("HTTP error! Status: 500")).toBeInTheDocument();
    });
  });
});
