import { Link } from "react-router";
import { CartBtn } from "./CartBtn/CartBtn";
import classes from "./Header.module.css";

export function Header() {
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.odinShopLink}>
        odin-shop
      </Link>
      <CartBtn />
    </header>
  );
}
