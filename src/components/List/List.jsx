import styles from "./List.module.css";
import Button from "../Button/Button";

export default function List() {
  const items = [
    "React",
    "CSS Modules",
    "Responsive Design",
    "Flexbox",
    "CSS Grid",
  ];

  return (
    <div className={styles.list}>
      <h3>Технологиялар</h3>

      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <Button>
        Қосу
      </Button>
    </div>
  );
}