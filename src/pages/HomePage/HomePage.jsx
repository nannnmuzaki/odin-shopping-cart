import { Link } from "react-router";
import classes from "./HomePage.module.css";

export function HomePage() {
  return (
    <>
      <section className={classes.homePage}>
        <h1>Welcome to odin-shop</h1>
        <p>
          Discover our curated selection of stuff for our beloved odinnete. <br />
          Delivered straight from the void to your table.
        </p>
        <Link to="/store" className={classes.cta}>
          Explore Now
        </Link>
      </section>
    </>
  );
}
