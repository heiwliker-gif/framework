import { useState } from "react";
import ItemList from "./components/ItemList";
import "./App.css";

function App() {
  const [studentName, setStudentName] = useState(
    () => window.localStorage.getItem("pz9-student-name") || "",
  );

  function updateStudentName(event) {
    const name = event.target.value;
    setStudentName(name);
    window.localStorage.setItem("pz9-student-name", name);
  }

  return (
    <main className="app-shell">
      <header className="hero-header">
        <div className="hero-copy">
          <p className="eyebrow">ВЕБ-БАҒДАРЛАМАЛАУ ҚҰРЫЛЫМДАРЫ · ПЖ №9</p>
          <h1>Кейс өтінімдері</h1>
          <p className="hero-description">
            Mock дереккөзімен тізімді жүктеу: loading, data және error күйлері.
          </p>
        </div>
        <div className="team-badge" aria-label="C тобы, mock тәсілі">
          <span className="team-letter">C</span>
          <span>
            <strong>C тобы</strong>
            <small>MOCK тәсілі</small>
          </span>
        </div>
      </header>

      <section className="student-bar" aria-label="Студент туралы ақпарат">
        <div className="student-avatar" aria-hidden="true">
          {studentName.trim().charAt(0).toLocaleUpperCase() || "?"}
        </div>
        <div className="student-field">
          <label htmlFor="student-name">Студенттің аты-жөні</label>
          <input
            id="student-name"
            type="text"
            value={studentName}
            onChange={updateStudentName}
            placeholder="Аты-жөніңізді енгізіңіз"
            autoComplete="name"
          />
        </div>
        <span className="student-hint">Енгізілген аты осы браузерде сақталады</span>
      </section>

      <ItemList />

      <footer className="page-footer">
        <span className="footer-mark" aria-hidden="true">M</span>
        <p>Желіге сұраусыз жұмыс істейтін жергілікті mock деректері</p>
        <span className="footer-tag">8 өтінім · 800 мс кідіріс</span>
      </footer>
    </main>
  );
}

export default App;
