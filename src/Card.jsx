import { useState, useEffect } from "react";
import SpriteGen from "./SpriteGen.jsx";

export default function CreateCard() {
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    console.log(isSelected);
  });

  return (
    <div className="card" onClick={() => setSelected(true)}>
      <SpriteGen />
    </div>
  );
}
