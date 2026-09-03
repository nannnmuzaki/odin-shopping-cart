import { Outlet } from "react-router";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import classes from "./Layout.module.css";
import { useState } from "react";

export function Layout() {
  const [cartItems, setCartItems] = useState([]);

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
