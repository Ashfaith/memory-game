import Pokemon from "./SpriteGen";
import { useState, useEffect } from "react";

const randNum = (max) => Math.floor(Math.random() * max) + 1;

export default function Deck() {
  const [cards, setCards] = useState(() => {
    const initPokeIds = new Array(10).fill(0).map(() => randNum(151));
    return initPokeIds.map((pokeId, index) => ({
      position: index + 1,
      pokeId: pokeId,
    }));
  });

  //Fisher-Yates shuffle
  function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  function cardClick() {
    const shuffledArray = [...cards];
    shuffle(shuffledArray);
    console.log(shuffledArray);
    setCards(shuffledArray);
  }

  return (
    <div className="card-container">
      <>
        {cards.map((card) => (
          <div className="card" key={card.position} onClick={cardClick}>
            <p>{card.position}</p>
            <Pokemon randNumb={card.pokeId} />
          </div>
        ))}
      </>
    </div>
  );
}
