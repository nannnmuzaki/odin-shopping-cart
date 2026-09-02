import { ProductCard } from "./ProductCard/ProductCard";
import { useState, useEffect } from "react";
import classes from "./ProductsGrid.module.css";

export function ProductsGrid() {
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function startFetching() {
      setIsLoading(true);
      setError(null);

      try {
        const query = "https://fakestoreapi.com/products";
        const response = await fetch(query, { signal });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setProductsData(await response.json());
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Caught error:", err);
          setError(err.message);
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    startFetching();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className={isLoading ? classes.loading : error ? classes.error : classes.productsGrid}>
      {isLoading && <strong>Loading...</strong>}
      {error && <strong>{error}</strong>}
      {!isLoading &&
        !error &&
        productsData.length > 0 &&
        productsData.map((item) => <ProductCard key={item.id} productData={item} />)}
    </div>
  );
}
