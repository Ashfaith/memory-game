import { useState, useEffect } from "react";
import "./App.css";

function PokeCall() {
  const [pokeData, setPokeData] = useState(null);
  useEffect(() => {
    async function getPokemon() {
      const result = await fetch("https://pokeapi.co/api/v2/pokemon/1");
      if (!ignore) {
        const data = await result.json();
        setPokeData(data);
      }
    }

    let ignore = false;
    getPokemon();
    return () => {
      ignore = true;
    };
  }, []);
  console.log(pokeData);

  return <div>test</div>;
}

function App() {
  return (
    <>
      <PokeCall />
    </>
  );
}

export default App;
