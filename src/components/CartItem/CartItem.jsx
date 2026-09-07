import { Link } from "react-router";
import classes from "./CartItem.module.css";
import React, { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

export const CartItem = React.memo(function CartItem({ productData, handleRemoveItem }) {
  const [addQuantity, setAddQuantity] = useState(productData.quantity);

  const onAddQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value, 10);

    if (Number.isNaN(value)) {
      setAddQuantity(addQuantity);
    } else {
      setAddQuantity(value);

      if (value <= 0) {
        setTimeout(() => {
          handleRemoveItem(productData.id);
        }, 300);
      }
    }
  };

  const incrementAddQuantity = (e) => {
    e.preventDefault();

    setAddQuantity((prev) => prev + 1);
  };

  const decrementAddQuantity = (e) => {
    e.preventDefault();

    setAddQuantity((prev) => {
      if (prev <= 1) {
        setTimeout(() => {
          handleRemoveItem(productData.id);
        }, 300);
      }
      return prev - 1;
    });
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
        <label htmlFor="add-quantity">Quantity</label>
        <div className={classes.belowQuantityLabel}>
          <button
            type="button"
            disabled={addQuantity <= 0}
            onClick={decrementAddQuantity}
            className={classes.quantityBtn}
          >
            <Minus />
          </button>
          <input
            type="number"
            name="addQuantity"
            id="add-quantity"
            onChange={onAddQuantityChange}
            value={Number(addQuantity)}
            min="0"
            className={classes.quantityInput}
          />
          <button type="button" onClick={incrementAddQuantity} className={classes.quantityBtn}>
            <Plus />
          </button>
          <button
            type="button"
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
