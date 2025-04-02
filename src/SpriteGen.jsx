import { useState, useEffect } from "react";
import { pokemonTypes } from "./types";

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

        const shinyRoll = Math.floor(Math.random() * 501) + 1;
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

  const captiliseFirstLetter = (value) => {
    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
  };

  const cardBackground = (val) => {
    return pokemonTypes[val];
  };

  if (!pokeData) return <div>Loading...</div>;

  return (
    <>
      <div
        className="card-inner"
        style={{
          backgroundColor: `${cardBackground(pokeData.types[0].type.name)}`,
        }}
      >
        <div className="sprite-container">
          <img
            className="sprite"
            src={pokeData.sprites[`front_${isShiny}`]}
            alt="Pokemon Sprite"
          />
        </div>
        <h3 className="pokeName">{captiliseFirstLetter(pokeData.name)}</h3>
      </div>
    </>
  );
}
