import { useCallback, useEffect, useRef, useState } from "react";

const MOCK_ITEMS = [
  {
    id: 1,
    title: "Өтінім №1 — Қалалық кітапхана",
    body: "Оқу залындағы орындарды онлайн брондау мүмкіндігін қосу.",
  },
  {
    id: 2,
    title: "Өтінім №2 — Студенттерге арналған карта",
    body: "Кампус ғимараттары мен қажетті кабинеттерді картадан табу.",
  },
  {
    id: 3,
    title: "Өтінім №3 — Іс-шаралар күнтізбесі",
    body: "Университеттегі алдағы іс-шараларды бір тізімде көрсету.",
  },
  {
    id: 4,
    title: "Өтінім №4 — Асхана мәзірі",
    body: "Күнделікті ас мәзірін және тағам құрамын жариялау.",
  },
  {
    id: 5,
    title: "Өтінім №5 — Жоғалған заттар",
    body: "Табылған және жоғалған заттар туралы хабарландырулар тізімі.",
  },
  {
    id: 6,
    title: "Өтінім №6 — Коворкинг орындары",
    body: "Бос жұмыс орындарын қарап, қажетті уақытқа белгілеу.",
  },
  {
    id: 7,
    title: "Өтінім №7 — Кері байланыс",
    body: "Кампус қызметтері туралы ұсыныстар мен пікірлерді жинау.",
  },
  {
    id: 8,
    title: "Өтінім №8 — Үйірмелер каталогы",
    body: "Студенттік клубтарды бағыты мен кестесі бойынша сүзу.",
  },
];

function loadMockItems(simulateError = false) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (simulateError) {
        reject(new Error("Mock қатесі: деректерді жүктеу сәтсіз аяқталды."));
        return;
      }

      resolve(MOCK_ITEMS);
    }, 800);
  });
}

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const isMounted = useRef(false);

  const loadList = useCallback(async (simulateError = false) => {
    setLoading(true);
    setError("");
    setSelectedItem(null);

    try {
      const data = await loadMockItems(simulateError);
      if (isMounted.current) setItems(data);
    } catch (requestError) {
      if (isMounted.current) {
        setError(requestError.message || "Белгісіз қате орын алды.");
      }
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    void loadList();

    return () => {
      isMounted.current = false;
    };
  }, [loadList]);

  return (
    <section className="list-section" aria-labelledby="list-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">ДЕРЕККӨЗ: MOCK / ЖЕРГІЛІКТІ МАССИВ</p>
          <h2 id="list-title">Кейс өтінімдері</h2>
          <p className="section-description">
            Деректер 800 мс кідірістен кейін жүктеледі. Қате күйін тексеру үшін
            төмендегі батырманы басыңыз.
          </p>
        </div>
        <button
          className="button button-danger-quiet"
          type="button"
          onClick={() => void loadList(true)}
          disabled={loading}
        >
          Қатені көрсету
        </button>
      </div>

      <div className="status-panel" aria-live="polite">
        {loading && (
          <div className="loading-state">
            <span className="spinner" aria-hidden="true" />
            <span>Өтінімдер жүктеліп жатыр...</span>
          </div>
        )}

        {!loading && error && (
          <div className="error-state" role="alert">
            <div>
              <p className="state-title">Деректерді жүктеу мүмкін болмады</p>
              <p className="state-description">{error}</p>
            </div>
            <button
              className="button button-primary"
              type="button"
              onClick={() => void loadList()}
            >
              Қайталау
            </button>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="empty-state">Әзірге өтінімдер жоқ.</p>
        )}

        {!loading && !error && items.length > 0 && (
          <>
            <div className="list-meta">
              <span>Барлық өтінім</span>
              <span className="count-badge">{items.length}</span>
            </div>
            <div className="item-grid">
              {items.map((item) => (
                <article className="item-card" key={item.id}>
                  <div className="item-card-topline">
                    <span className="item-number">#{String(item.id).padStart(2, "0")}</span>
                    <span className="item-dot" aria-hidden="true" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <button
                    className="text-button"
                    type="button"
                    aria-expanded={selectedItem?.id === item.id}
                    onClick={() =>
                      setSelectedItem((current) =>
                        current?.id === item.id ? null : item,
                      )
                    }
                  >
                    {selectedItem?.id === item.id
                      ? "Толық ақпаратты жабу"
                      : "Толық ақпарат"}
                    <span aria-hidden="true">→</span>
                  </button>
                </article>
              ))}
            </div>

            {selectedItem && (
              <aside className="details-panel" aria-live="polite">
                <div>
                  <p className="eyebrow">ӨТІНІМ ID: {selectedItem.id}</p>
                  <h3>{selectedItem.title}</h3>
                  <p>{selectedItem.body}</p>
                </div>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => setSelectedItem(null)}
                >
                  Тізімге оралу
                </button>
              </aside>
            )}
          </>
        )}
      </div>
    </section>
  );
}
