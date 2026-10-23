import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  onClick,
}) {
  const className = [
    styles.btn,
    variant === "secondary"
      ? styles.secondary
      : styles.primary,
  ].join(" ");

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}