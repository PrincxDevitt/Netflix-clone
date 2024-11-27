import React, { useEffect, useRef } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';

const TitleCards = ({title,category}) => {
  const cardRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const currentRef = cardRef.current;
    currentRef.addEventListener('wheel', handleWheel);

    // Cleanup al desmontar el componente
    return () => {
      currentRef.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="title_cards">
      <h2>{typeof title === 'string' ? title : "Popular on Netflix"}</h2>
      <div className="card_list" ref={cardRef}>
        {cards_data.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.image} alt={card.name} />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
