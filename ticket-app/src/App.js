import styles from "./App.module.css";
import Home from "./pages/home/Home.js";

function App() {
  return (
    <div className={styles.background}>
      <Home />
    </div>
  );
}

export default App;
