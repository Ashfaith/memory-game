import { useState, useEffect } from "react";

const randNum = (max) => Math.floor(Math.random() * max) + 1;

function pokeCall(abortSignal) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${randNum(151)}`, {
    signal: abortSignal,
  }).then((result) => result.json());
}

export default function Pokemon() {
  const [pokeData, setPokeData] = useState(null);
  const [isShiny, setShiny] = useState("default");

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    pokeCall(signal)
      .then((data) => {
        setPokeData(data);

        const shinyRoll = randNum(65535);
        if (shinyRoll === 8) {
          setShiny("shiny");
        } else {
          setShiny("default");
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error fetching pokeAPI", error);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  if (!pokeData) return <div>Loading...</div>;

  return (
    <img src={pokeData.sprites[`front_${isShiny}`]} alt="Pokemon Sprite" />
  );
}
