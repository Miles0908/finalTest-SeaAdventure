import { useEffect } from "react";
import styles from "./CardList.module.scss";
import { useState } from "react";

const CardList = () => {
  const [dataCard, setDataCard] = useState([]);

  useEffect(() => {
    fetch("https://api.npoint.io/87533bc829c8f6f6e760")
      .then((res) => res.json())
      .then((data) => setDataCard(data));
  }, []);

  return (
    <div className={styles.CardList}>
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

export default CardList;
