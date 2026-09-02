import { Link } from "react-router";
import classes from "./ProductCard.module.css";

export function ProductCard({ productData, inCart }) {
  return (
    <Link to={"/products/" + productData.id} className={classes.productCard}>
      <img src={productData.image} alt={`an image of ${productData.title}`} />
      <div className={classes.belowImg}>
        <strong>{"$" + productData.price + " OD"}</strong>
        <strong>{productData.title}</strong>
        <button type="button" className={classes.addBtn}>
          {inCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
}
