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
      <div>Current Score:{score}</div>
      <div>High Score:{highScore}</div>
    </>
  );
}
