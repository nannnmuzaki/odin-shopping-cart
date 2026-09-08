import React, { useState, useEffect } from "react";
import classes from "./CartPage.module.css";
import { useCallback } from "react";
import { useOutletContext } from "react-router";
import { CartItem } from "../../components/CartItem/CartItem";
import { useMemo } from "react";

export const CartPage = React.memo(function CartPage() {
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { cartItems, setCartItems } = useOutletContext();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function startFetching() {
      setIsLoading(true);
      setError(null);

      try {
        const query = "https://fakestoreapi.com/products";
        const response = await fetch(query, { signal });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setProductsData(await response.json());
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Caught error:", err);
          setError(err.message);
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    startFetching();

    return () => {
      controller.abort();
    };
  }, []);

  const cartItemsDetail = useMemo(() => {
    return cartItems
      .map((item) => {
        const product = productsData.find((product) => product.id === item.id);

        return product ? { ...product, quantity: item.quantity } : null;
      })
      .filter(Boolean);
  }, [productsData, cartItems]);

  const totalPrice = useMemo(
    () =>
      cartItemsDetail.reduce(
        (accumulator, currentItem) =>
          (accumulator =
            (accumulator * 100 + currentItem.price * 100 * currentItem.quantity) / 100),
        0,
      ),
    [cartItemsDetail],
  );

  const handleRemoveItem = useCallback(
    (productId) => {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
    },
    [setCartItems],
  );

  const handleItemQuantityChange = useCallback(
    (productId, newQuantity) => {
      setCartItems((prev) =>
        prev.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)),
      );
    },
    [setCartItems],
  );

  return (
    <section className={classes.cartPage}>
      <h1>Your Cart</h1>
      <div
        className={
          isLoading
            ? classes.loading
            : error
              ? classes.error
              : cartItems.length <= 0
                ? classes.noItem
                : classes.cartGrid
        }
      >
        {cartItems.length <= 0 && (
          <strong>There's no item on your cart yet, start shopping!</strong>
        )}
        {isLoading && <strong>Loading...</strong>}
        {error && <strong>{error}</strong>}
        {!isLoading &&
          !error &&
          cartItemsDetail.length > 0 &&
          cartItemsDetail.map((item) => (
            <CartItem
              key={item.id}
              productData={item}
              handleItemQuantityChange={handleItemQuantityChange}
              handleRemoveItem={handleRemoveItem}
            />
          ))}
      </div>
      <div className={classes.totalPrice}>
        <span>Total Price: </span>
        <span>{"$" + totalPrice + " OD"}</span>
      </div>
    </section>
  );
});
