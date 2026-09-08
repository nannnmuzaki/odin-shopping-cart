import { Link } from "react-router";
import classes from "./CartItem.module.css";
import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

export const CartItem = React.memo(function CartItem({
  productData,
  handleItemQuantityChange,
  handleRemoveItem,
}) {
  const onQuantityInputChange = (e) => {
    const rawVal = e.target.value;
    if (rawVal === "") return;

    const value = parseInt(rawVal, 10);
    if (!isNaN(value)) {
      if (value <= 0) {
        handleRemoveItem(productData.id);
      } else {
        handleItemQuantityChange(productData.id, value);
      }
    }
  };

  const incrementQuantity = (e) => {
    e.preventDefault();
    handleItemQuantityChange(productData.id, productData.quantity + 1);
  };

  const decrementQuantity = (e) => {
    e.preventDefault();

    const newQuantity = productData.quantity - 1;
    if (newQuantity <= 0) {
      handleRemoveItem(productData.id);
    } else {
      handleItemQuantityChange(productData.id, newQuantity);
    }
  };

  return (
    <div className={classes.cartItem}>
      <Link to={"/products/" + productData.id} className={classes.cardLink}>
        <img src={productData.image} alt={`an image of ${productData.title}`} />
        <div className={classes.belowProductImg}>
          <strong>{"$" + productData.price + " OD"}</strong>
          <strong>{productData.title}</strong>
        </div>
      </Link>

      <div className={classes.addingWrapper}>
        <label htmlFor="quantity">Quantity</label>
        <div className={classes.belowQuantityLabel}>
          <button
            type="button"
            aria-label="decrease quantity"
            disabled={productData.quantity <= 0}
            onClick={decrementQuantity}
            className={classes.quantityBtn}
          >
            <Minus />
          </button>
          <input
            type="number"
            name="quantity"
            id="quantity"
            onChange={onQuantityInputChange}
            value={Number(productData.quantity)}
            min="0"
            className={classes.quantityInput}
          />
          <button
            type="button"
            aria-label="increase quantity"
            onClick={incrementQuantity}
            className={classes.quantityBtn}
          >
            <Plus />
          </button>
          <button
            type="button"
            aria-label="remove item"
            onClick={() => handleRemoveItem(productData.id)}
            className={classes.removeBtn}
          >
            <Trash2 />
          </button>
        </div>
        <div className={classes.belowQuantityInput}>
          <strong>Total: </strong>
          <strong>{"$" + (productData.price * 100 * productData.quantity) / 100 + " OD"}</strong>
        </div>
      </div>
    </div>
  );
});
