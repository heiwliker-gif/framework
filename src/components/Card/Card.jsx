import styles from "./Card.module.css";

export default function Card({ title, children, footer }) {
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.body}>
        {children}
      </div>

      {footer && (
        <div className={styles.footer}>
          {footer}
        </div>
      )}
    </article>
  );
}