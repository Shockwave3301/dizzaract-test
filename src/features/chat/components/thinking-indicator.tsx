import { useEffect, useState, type ReactElement } from "react";

// 3 «дорожки» (верхняя / центральная / нижняя строки матрицы), цифры — уровень
// яркости 0–4. Кадр — это окно из 6 ячеек, скользящее по дорожке: с каждым
// шагом окно сдвигается, и импульс бежит слева направо. Колонка 0 — передний край.
// Цвета, анимацию и настройку см. в index.css
const TRACKS = [
  "0000001234321000000", // Верхний ряд
  "0000012344432100000", // Центральный ряд
  "0000001234321000000", // Нижний ряд
] as const;

const WINDOW = 6;
const FRAME_COUNT = TRACKS[0].length - WINDOW + 1;
const CYCLE_MS = 1000;
const FRAME_MS = CYCLE_MS / FRAME_COUNT;

function ThinkingIndicator(): ReactElement {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((current) => (current + 1) % FRAME_COUNT);
    }, FRAME_MS);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="thinking-matrix" role="status" aria-label="Thinking">
      {TRACKS.map((track, rowIndex) => {
        const cells = Array.from(track.slice(frame, frame + WINDOW)).reverse();
        return cells.map((level, colIndex) => (
          <span
            key={`${String(rowIndex)}-${String(colIndex)}`}
            className="thinking-cell"
            data-level={level}
          />
        ));
      })}
    </div>
  );
}

export default ThinkingIndicator;
