import { Outlet } from "react-router";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import classes from "./Layout.module.css";
import { useState, useEffect } from "react";

const CART_STORAGE_KEY = "odin_shop_cart";

export function Layout() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart items from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart items to localStorage:", error);
    }
  }, [cartItems]);

  return (
    <>
      <Header cartItems={cartItems} />
      <main className={classes.main}>
        <Outlet context={{ cartItems, setCartItems }} />
      </main>
      <Footer />
    </>
  );
}
