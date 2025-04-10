import Pokemon from "./SpriteGen.jsx";
import Score from "./Score.jsx";
import { useState } from "react";

const randNum = (max) => Math.floor(Math.random() * max) + 1;

export default function App() {
  const usedNumbers = [];
  let pickedNumber;
  const chooseNumber = () => {
    do {
      pickedNumber = randNum(151);
    } while (usedNumbers.includes(pickedNumber));

    usedNumbers.push(pickedNumber);
    return pickedNumber;
  };

  const [cards, setCards] = useState(() => {
    const initPokeIds = new Array(10).fill(0).map(() => chooseNumber());
    return initPokeIds.map((pokeId, index) => ({
      position: index + 1,
      pokeId: pokeId,
    }));
  });
  console.log(cards);

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

  const [score, setScore] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);

  function scoreUpdate(selectedCard) {
    const updatedCards = [...selectedCards, selectedCard];
    setSelectedCards(updatedCards);

    console.log(selectedCards);
    if (!selectedCards.includes(selectedCard)) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setScore(0);
      setSelectedCards([]);
    }
  }

  function cardClick() {
    const shuffledArray = [...cards];
    shuffle(shuffledArray);
    console.log(shuffledArray);
    setCards(shuffledArray);
  }

  return (
    <>
    <Score score={score}/>
    <div className="card-container">
        {cards.map((card) => (
          <div
            className="card"
            key={card.position}
            onClick={() => {
              cardClick();
              scoreUpdate(card.position);
            }}
          >
            <Pokemon randNumb={card.pokeId} />
          </div>
        ))}
    </div>
    </>
  );
}
