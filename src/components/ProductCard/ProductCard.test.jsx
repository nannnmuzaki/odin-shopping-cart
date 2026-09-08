import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { ProductCard } from "./ProductCard";

describe("ProductCard Component", () => {
  const mockProduct = {
    id: 1,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  };

  it("renders initial product information and 'Get Product' button", () => {
    render(
      <MemoryRouter>
        <ProductCard productData={mockProduct} onAddToCart={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Mens Casual Premium Slim Fit T-Shirts")).toBeInTheDocument();
    expect(screen.getByText("$22.3 OD")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Get Product" })).toBeInTheDocument();
  });

  it("opens quantity control form when 'Get Product' is clicked", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ProductCard productData={mockProduct} onAddToCart={vi.fn()} />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Get Product" }));

    expect(screen.getByLabelText("Quantity")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add to Cart" })).toBeInTheDocument();
  });

  it("allows incrementing quantity and triggers onAddToCart callback", async () => {
    const user = userEvent.setup();
    const handleAddToCart = vi.fn();

    render(
      <MemoryRouter>
        <ProductCard productData={mockProduct} onAddToCart={handleAddToCart} />
      </MemoryRouter>,
    );

    // Open controls
    await user.click(screen.getByRole("button", { name: "Get Product" }));

    // Increment quantity twice
    const quantityInput = screen.getByLabelText("Quantity");
    const incrementBtn = screen.getByRole("button", { name: /increase quantity/i }); // Plus button
    await user.click(incrementBtn);
    await user.click(incrementBtn);

    expect(quantityInput).toHaveValue(2);

    // Click Add to Cart
    await user.click(screen.getByRole("button", { name: "Add to Cart" }));

    expect(handleAddToCart).toHaveBeenCalledWith(1, 2);
  });
});
