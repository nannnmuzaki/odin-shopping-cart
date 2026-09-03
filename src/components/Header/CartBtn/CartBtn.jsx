import { ShoppingCart } from "lucide-react";
import classes from "./CartBtn.module.css";

export function CartBtn({ cartItems }) {
  const itemCount = cartItems.reduce(
    (accumulator, currentItem) => accumulator + currentItem.quantity,
    0,
  );

  return (
    <button className={classes.cartBtn} type="button">
      <div className={classes.cartIconWrapper}>
        <ShoppingCart />
        <span className={classes.cartBadge}>{itemCount}</span>
      </div>
    </button>
  );
}
