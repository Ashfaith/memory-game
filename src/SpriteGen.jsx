import { useState, useEffect } from "react";

function pokeCall(abortSignal, randNumb) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${randNumb}`, {
    signal: abortSignal,
  }).then((result) => result.json());
}

export default function Pokemon({ randNumb }) {
  const [pokeData, setPokeData] = useState(null);
  const [isShiny, setShiny] = useState("default");

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    pokeCall(signal, randNumb)
      .then((data) => {
        setPokeData(data);

        const shinyRoll = Math.floor(Math.random() * 65535) + 1;
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
