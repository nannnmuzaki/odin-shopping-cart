import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router";
import { CartBtn } from "./CartBtn";

describe("CartBtn Component", () => {
  it("renders 0 when cart is empty", () => {
    render(
      <MemoryRouter>
        <CartBtn cartItems={[]} />
      </MemoryRouter>,
    );

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("calculates total aggregated item count correctly", () => {
    const mockCartItems = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 5 },
    ];

    render(
      <MemoryRouter>
        <CartBtn cartItems={mockCartItems} />
      </MemoryRouter>,
    );

    expect(screen.getByText("7")).toBeInTheDocument();
  });
});
