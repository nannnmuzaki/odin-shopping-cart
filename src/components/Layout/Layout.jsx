import { Outlet } from "react-router";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import classes from "./Layout.module.css";

export function Layout() {
  return (
    <>
      <Header />
      <main className={classes.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
