import { Link } from "react-router";
import { CartBtn } from "./CartBtn/CartBtn";
import classes from "./Header.module.css";

export function Header() {
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.odinShopLink}>
        odin-shop
      </Link>
      <div className={classes.rightHeader}>
        <Link className={classes.headerLink} to="/">
          Home
        </Link>
        <Link className={classes.headerLink} to="/store">
          Store
        </Link>
        <div className={classes.divider}></div>
        <CartBtn />
      </div>
    </header>
  );
}
