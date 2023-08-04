import { useEffect } from "react";
import styles from "./RandomList.module.scss";
import { useState } from "react";
import arrowIcon from "../../assets/arrowIcon.svg"

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
           <b> {card.budget.value} {card.budget.currencyCode} </b>per cabina
         </p>
         <h2 className={styles.SingleCard__Title}>{card.title}</h2>
         <div className={styles.SingleCard__BoatType}>
           <p className={styles.SingleCard__ParagraphBlue}>
             <b>Partenza da: </b><br />
             <p className={styles.SingleCard__Departure}>
               {card.departure.Port}
             </p>
           </p>
           <div className={styles.SingleCard__Days}>
          <b> {card.boatType} <br /> {card.numberOfDays} Giorni</b>
           </div>
         </div>
         <div className={styles.SingleCard__Period}>
           <p>{card.departureDate}</p>
          <img className={styles.SingleCard__Icon} src={arrowIcon} alt="arrowIcon" />
           <p> {card.arrivalDate}</p>
         </div>
         <div className={styles.SingleCard__Available}>
         <p>{card.reservations} Cabine</p>
         <p><span className={styles.SingleCard__ParagraphBlue}><b>Disponibilità</b></span> {card.reservationsAvailable}</p>
         </div>
         <button className={styles.SingleCard__btn}>Prenota</button>
       </li>
        ))}
      </ul>
    </div>
  );
};

export default RandomList;
