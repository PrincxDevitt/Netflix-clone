import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';

const TitleCards = ({title,category}) => {

  const [apiData, setApiData] = useState([]);
  const cardRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGUyZTAwNDg2YTAyN2VmZDcwZmMwZjMxMzc1ZGZjNyIsIm5iZiI6MTczNDAwNTQ1Mi44MzksInN1YiI6IjY3NWFkMmNjN2MyZDUxYmRiZDFmODNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y3ZInytrBZAHCpHdfH1tNzXkIgJMPv0ntaGD9qK7JaA'
  }
};



  const handleWheel = (event) => {
    event.preventDefault();
    cardRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

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
        {apiData.map((card, index) => (
          <div className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+ card.backdrop_path} alt=""/>
            <p>{card.original_title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
