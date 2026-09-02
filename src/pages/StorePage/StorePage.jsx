import { ProductsGrid } from "../../components/ProductsGrid/ProductsGrid";
import classes from "./StorePage.module.css";

export function StorePage() {
  return (
    <>
      <section className={classes.storePage}>
        <h1>Products</h1>
        <ProductsGrid />
      </section>
    </>
  );
}
