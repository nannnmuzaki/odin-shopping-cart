import { CartBtn } from "./CartBtn/CartBtn";
import classes from "./Header.module.css";

export function Header() {
  return (
    <header className={classes.header}>
      <h1>odin-shop</h1>
      <CartBtn />
    </header>
  );
}
