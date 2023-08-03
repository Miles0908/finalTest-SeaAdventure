import { useEffect } from "react";
import styles from "./RandomList.module.scss";
import { useState } from "react";

const RandomList = () => {
  const [dataCard, setDataCard] = useState([]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  useEffect(() => {
    fetch("https://api.npoint.io/87533bc829c8f6f6e760")
      .then((res) => res.json())
      .then((data) => {
        const shuffledData = shuffleArray(data);
        setDataCard(shuffledData);
      });
  }, []);

  return (
    <div className={styles.CardList}>
      <h1>Avventure da Scoprire</h1>
      <ul className={styles.List}>
        {dataCard.map((card) => (
          <li className={styles.SingleCard} key={card.id}>
            <p>
              Prezzo per cabina: {card.budget.value} {card.budget.currencyCode}
            </p>
            <h2>{card.title}</h2>
            <div className={styles.SingleCard__BoatType}>
              <p className={styles.SingleCard__ParagraphBlue}>
                Partenza da: <br />
                <p className={styles.SingleCard__Departure}>
                  {card.departure.Port}
                </p>
              </p>
              {card.boatType} <br /> {card.numberOfDays} Giorni
            </div>
            <div className={styles.SingleCard__Period}>
              <p>{card.departureDate}</p>
              <p> {card.arrivalDate}</p>
            </div>
            <p>{card.reservations} Cabine</p>
            <p>Disponibilità {card.reservationsAvailable}</p>
            <button className={styles.SingleCard__btn}>Prenota</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RandomList;
