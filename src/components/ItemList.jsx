import { useEffect, useState } from "react";

const MOCK = [
  { id: 1, title: "Заявка №1" },
  { id: 2, title: "Заявка №2" },
  { id: 3, title: "Заявка №3" },
];

export default function ItemList() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("ItemList mount");

    let alive = true;

    setLoading(true);
    setError("");

    const timer = setTimeout(() => {
      if (!alive) return;

      setItems(MOCK);
      setLoading(false);
    }, 1000);

    return () => {
      console.log("ItemList cleanup");

      alive = false;
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  if (items.length === 0) {
    return <p>Пока нет записей</p>;
  }

  return (
    <div>
      <h2>Список заявок</h2>

      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}