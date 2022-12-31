import { useState } from "react";

import "./App.css";

interface iListState {
  x: number;
  y: number;
}

function App() {
  const [list, setList] = useState<iListState[]>([]);
  const [last, setLast] = useState<iListState[]>([]);

  window.onclick = (event) => {
    const click = event.target as HTMLBodyElement;

    if (click.nodeName !== "BUTTON") {
      const newDot = {
        x: event.x,
        y: event.y,
      };

      setList([...list, newDot]);
      setLast([]);
    }
  };

  const undo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const lastUndo = list[list.length - 1];

    if (list.length === 0) return;
    setLast([...last, lastUndo]);
    setList(list.filter((_, i, array) => i !== array.length - 1));
  };

  const redo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const lastRedo = last[last.length - 1];

    if (last.length === 0) return;
    setList([...list, lastRedo]);
    setLast(last.filter((_, i, array) => i !== array.length - 1));
  };

  return (
    <div>
      <h1>Clique em qualquer área da tela</h1>
      {list.map(({ x, y }, index) => (
        <span key={index} className="dot" style={{ top: y, left: x }} />
      ))}
      <button onClick={undo}>Desfazer</button>
      <button onClick={redo}>Refazer</button>
    </div>
  );
}

export default App;
