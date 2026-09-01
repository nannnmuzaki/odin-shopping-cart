import { Header } from "./components/Header/Header";
import classes from "./App.module.css";

function App() {
  return (
    <>
      <Header />
      <main className={classes.main}></main>
    </>
  );
}

export default App;
