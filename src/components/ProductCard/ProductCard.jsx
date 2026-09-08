import { Link } from "react-router";
import classes from "./ProductCard.module.css";
import React, { useState } from "react";
import { Minus, Plus, X } from "lucide-react";

export const ProductCard = React.memo(function ProductCard({ productData, onAddToCart }) {
  const [isGetProduct, setIsGetProduct] = useState(false);
  const [addQuantity, setAddQuantity] = useState(0);

  const onGetProductClick = (e) => {
    e.preventDefault();

    if (isGetProduct) return;

    setIsGetProduct(true);
  };

  const onAddQuantityChange = (e) => {
    if (!isGetProduct) return;

    const value = Number.parseInt(e.target.value, 10);

    if (Number.isNaN(value)) {
      setAddQuantity(0);
    } else {
      setAddQuantity(Math.max(0, value));
    }
  };

  const incrementAddQuantity = (e) => {
    e.preventDefault();

    if (!isGetProduct) return;

    setAddQuantity((prev) => prev + 1);
  };

  const decrementAddQuantity = (e) => {
    e.preventDefault();

    if (!isGetProduct) return;

    if (addQuantity <= 0) return;

    setAddQuantity((prev) => prev - 1);
  };

  const onAddClick = (e) => {
    e.preventDefault();

    if (!isGetProduct) return;

    if (!addQuantity <= 0) {
      onAddToCart(productData.id, addQuantity);
    }
  };

  const onCloseClick = (e) => {
    e.preventDefault();

    if (!isGetProduct) return;

    setIsGetProduct(false);
    setAddQuantity(0);
  };

  return (
    <div className={classes.productCard}>
      <Link to={"/products/" + productData.id} className={classes.cardLink}>
        <img src={productData.image} alt={`an image of ${productData.title}`} />
        <div className={classes.belowProductImg}>
          <strong>{"$" + productData.price + " OD"}</strong>
          <strong>{productData.title}</strong>
        </div>
      </Link>
      {isGetProduct && (
        <>
          <div className={classes.addingWrapper}>
            <label htmlFor="add-quantity">Quantity</label>
            <div className={classes.belowQuantityLabel}>
              <button
                type="button"
                aria-label="decrease quantity"
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
              <button
                type="button"
                aria-label="increase quantity"
                onClick={incrementAddQuantity}
                className={classes.quantityBtn}
              >
                <Plus />
              </button>
            </div>
            <div className={classes.belowQuantityInput}>
              <button type="button" onClick={onAddClick} className={classes.addBtn}>
                Add to Cart
              </button>
              <button type="button" onClick={onCloseClick} className={classes.closeBtn}>
                <X />
              </button>
            </div>
          </div>
        </>
      )}
      {!isGetProduct && (
        <button type="button" onClick={onGetProductClick} className={classes.getProductBtn}>
          Get Product
        </button>
      )}
    </div>
  );
});
