import CreateCard from "./Card";

export default function App() {
  const cardArray = new Array(10).fill(null);

  return (
    <div className="card-container">
      <>
        {cardArray.map((card, index) => (
          <CreateCard card={card} key={index} />
        ))}
      </>
    </div>
  );
}
