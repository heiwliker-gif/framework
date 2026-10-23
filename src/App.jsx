import { useState } from "react";
import ItemList from "./components/ItemList";
import Timer from "./components/Timer";
import "./App.css";

function App() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div className="app">
      <h1>Практикалық жұмыс №5</h1>

      <p>
        Хуктар және composition: деректер, таймерлер, тазалау
      </p>

      <hr />

      <ItemList />

      <hr />

      <button onClick={() => setShowTimer(!showTimer)}>
        {showTimer ? "Таймерді жасыру" : "Таймерді көрсету"}
      </button>

      {showTimer && <Timer seconds={10} />}
    </div>
  );
}

export default App;