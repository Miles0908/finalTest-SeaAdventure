import { useEffect } from "react";
import styles from "./CardList.module.scss";
import { useState } from "react";
import arrowIcon from "../../assets/arrowIcon.svg"

const CardList = () => {
  //Stati dei dati delle carte , show more card = mostra altri , filter = filtri , groupData raggruppamento
  const [dataCard, setDataCard] = useState([]);
  const [showMoreCard, setShowMoreCard] = useState(8);
  const [filter, setfilter] = useState("all");
  const [showGroupedData, setShowGroupedData] = useState(false);
  const [groupedData, setGroupedData] = useState({});
  
  //Quante card mostrare
  const cardPerLoad = 8;

  //fetch dei dati ad un npoint creato da me
  useEffect(() => {
    fetch("https://api.npoint.io/87533bc829c8f6f6e760")
      .then((res) => res.json())
      .then((data) => {
        setDataCard(data);
        const grouped = groupByDeparturePort(data);
        setGroupedData(grouped);
      });
  }, []);
//Step mostra altri
  const handleShowMore = () => {
    setShowMoreCard((prevShowMoreCard) => prevShowMoreCard + cardPerLoad);
  };
  
  //Step raggruppamento 
  const groupByDeparturePort = (data) => {
    const groupedData = {};
    data.forEach((card) => {
      const port = card.departure.Port;
      if (!groupedData[port]) {
        groupedData[port] = [];
      }
      groupedData[port].push(card);
    });
    return  groupedData;
  };
  // filtro per porto di partenza
  const handlefilter2 = (e) => {
    const selectedFilter = e.target.value;
    setfilter(selectedFilter);
    setShowGroupedData(selectedFilter === "grouped");
  };

//Step filtri
  const handlefilter = (e) => {
    setfilter(e.target.value);
  };

//Filtro dei dati
  const filteredData =
    filter === "all"
      ? dataCard
      : dataCard.filter((card) => card.departure.Port === filter);

  
  return (
    <div className={styles.CardList}>
    
      <div className={styles.Filter}>
        {/* Select del mostra per porto di partenza */}
      <select className={styles.PortFilter} onChange={handlefilter2} value={filter}>
  <option value="all">Mostra Tutti</option>
  <option value="grouped">Mostra per Porto di Partenza</option>
</select>
        {/* Select dei filtri */}
        <select className={styles.PortFilter} onChange={handlefilter} value={filter}>
          <option value="all">Mostra Tutti</option>
          {dataCard
            .reduce((uniquePorts, card) => {
              if (!uniquePorts.includes(card.departure.Port)) {
                
                uniquePorts.push(card.departure.Port);
              }
              return uniquePorts;
            }, [])
            .map((port) => (
              <option key={port} value={port}>
                {port}
              </option>
            ))}
        </select>
      </div>
      <ul className={styles.List}>
        {/* Listato delle card per porto di partenza */}
        {showGroupedData 
        ? Object.keys(groupedData).map((port)=>
        <div  key={port}><h2 className={styles.SingleCard__Departureby} >{port}</h2>
       { groupedData[port].map((card)=>(  
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
        </div>
        )
        :
        filteredData.slice(0, showMoreCard).map((card) => (
          /*  Listato delle card con funzione Mostra altri */
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
      {/* Bottone Mostra altri che se arriva al massimo scompare */}
      {showMoreCard < filteredData.length && (
        <button className={styles.ShowMore} onClick={handleShowMore}>
          Mostra altri
        </button>
      )}
    </div>
  );
};

export default CardList;
