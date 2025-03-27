import Pokemon from "./SpriteGen";

export default function App() {
  const pokeArray = new Array(10).fill(null);

  return (
    <div className="card-container">
      <>
        {pokeArray.map((pokemon, index) => (
          <div className="card" key={index}>
            <Pokemon pokemon={pokemon} />
          </div>
        ))}
      </>
    </div>
  );
}

// const [excludeIds, setExcludeIds] = useState([]);

// let pokemonId;
// do {
//   pokemonId = randNum(151);
// } while (excludeIds.includes(pokemonId));

// excludeIds.push(pokemonId);

// setExcludeIds((prevExcludeIds) => [...prevExcludeIds, data.id]);
// console.log(prevExcludeIds);
