import styles from "./Header.module.css";
import Button from "../Button/Button";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        My Case
      </div>

      <div className={styles.info}>
        <span>ФИО: Нурлан</span>

        <nav className={styles.navigation}>
          <a href="#home">Басты бет</a>
          <a href="#cards">Карточкалар</a>
          <a href="#about">Ақпарат</a>
        </nav>

        <Button variant="secondary">
          Шығу
        </Button>
      </div>
    </header>
  );
}