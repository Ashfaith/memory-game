import { useState, useEffect } from "react";

const randNum = (max) => Math.floor(Math.random() * max) + 1;

function PokeCall({ setPokeData }) {
  useEffect(() => {
    async function getPokemon() {
      const result = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randNum(151)}`
      );
      const data = await result.json();
      setPokeData(data);
    }

    getPokemon();
  }, [setPokeData]);

  return null;
}

function Sprite({ pokeData }) {
  if (!pokeData) return <div>Loading...</div>;

  const [isShiny, setShiny] = useState("default");

  useEffect(() => {
    const shinyRoll = randNum(65535);
    if (shinyRoll === 8) {
      setShiny("shiny");
    } else {
      setShiny("default");
    }
  }, [pokeData]);

  return (
    <img src={pokeData.sprites[`front_${isShiny}`]} alt="Pokemon Sprite"></img>
  );
}

function SpriteGen() {
  const [pokeData, setPokeData] = useState(null);
  console.log(pokeData);
  return (
    <>
      <PokeCall setPokeData={setPokeData} />
      <Sprite pokeData={pokeData} />
    </>
  );
}

export default SpriteGen;
