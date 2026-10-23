import { useEffect, useState } from "react";

export default function Timer({ seconds = 10 }) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    if (left <= 0) {
      return;
    }

    const id = setInterval(() => {
      setLeft((value) => value - 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [left]);

  return (
    <div>
      <h2>Кері санақ</h2>

      <p>Қалды: {left} с</p>

      <button onClick={() => setLeft(seconds)}>
        Сброс
      </button>
    </div>
  );
}