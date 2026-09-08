import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { CartItem } from "./CartItem";

describe("CartItem Component", () => {
  const mockProduct = {
    id: 1,
    title: "Test Item",
    price: 15,
    quantity: 2,
    image: "test.jpg",
  };

  it("calculates and displays individual item total correctly", () => {
    render(
      <MemoryRouter>
        <CartItem
          productData={mockProduct}
          handleItemQuantityChange={vi.fn()}
          handleRemoveItem={vi.fn()}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("$30 OD")).toBeInTheDocument();
  });

  it("calls handleItemQuantityChange when increment (+) button is clicked", async () => {
    const user = userEvent.setup();
    const handleQuantityChange = vi.fn();

    render(
      <MemoryRouter>
        <CartItem
          productData={mockProduct}
          handleItemQuantityChange={handleQuantityChange}
          handleRemoveItem={vi.fn()}
        />
      </MemoryRouter>,
    );

    const plusBtn = screen.getByRole("button", { name: /increase quantity/i });
    await user.click(plusBtn);

    expect(handleQuantityChange).toHaveBeenCalledWith(1, 3);
  });

  it("calls handleItemQuantityChange when decrement (-) button is clicked", async () => {
    const user = userEvent.setup();
    const handleQuantityChange = vi.fn();

    render(
      <MemoryRouter>
        <CartItem
          productData={mockProduct}
          handleItemQuantityChange={handleQuantityChange}
          handleRemoveItem={vi.fn()}
        />
      </MemoryRouter>,
    );

    const minusBtn = screen.getByRole("button", { name: /decrease quantity/i });
    await user.click(minusBtn);

    expect(handleQuantityChange).toHaveBeenCalledWith(1, 1);
  });

  it("calls handleRemoveItem when decrement (-) is clicked on item with quantity 1", async () => {
    const user = userEvent.setup();
    const handleRemove = vi.fn();
    const singleItem = { ...mockProduct, quantity: 1 };

    render(
      <MemoryRouter>
        <CartItem
          productData={singleItem}
          handleItemQuantityChange={vi.fn()}
          handleRemoveItem={handleRemove}
        />
      </MemoryRouter>,
    );

    const minusBtn = screen.getByRole("button", { name: /decrease quantity/i });
    await user.click(minusBtn);

    expect(handleRemove).toHaveBeenCalledWith(1);
  });

  it("calls handleRemoveItem when trash button is clicked", async () => {
    const user = userEvent.setup();
    const handleRemove = vi.fn();

    render(
      <MemoryRouter>
        <CartItem
          productData={mockProduct}
          handleItemQuantityChange={vi.fn()}
          handleRemoveItem={handleRemove}
        />
      </MemoryRouter>,
    );

    const trashBtn = screen.getByRole("button", { name: /remove item/i });
    await user.click(trashBtn);

    expect(handleRemove).toHaveBeenCalledWith(1);
  });
});
