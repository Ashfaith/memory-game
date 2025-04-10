import { useEffect, useState } from "react";

export default function Score({ score }) {
  useEffect(() => {}, [score]);

  const [highScore, setHighScore] = useState(score);
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  return (
    <>
    <div className="score-container">
      <p>Current Score:{score}</p>
      <p>High Score:{highScore}</p>
    </div>
    </>
  );
}
