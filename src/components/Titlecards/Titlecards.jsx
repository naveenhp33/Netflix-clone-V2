import React, { useEffect, useRef } from 'react'
import './Titlecards.css'
import cards_data from '../../assets/cards/Cards_data.js'
import { useState } from 'react'
import { Link } from 'react-router-dom'





const Titlecards = ({title,Category}) => {
   
const[apiData, setApiData] = useState([]);

  const cardsRef = useRef();
  
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjU2ZTE3ZDhlYWQzZmNkZmY3NDg3NDFjMmQxOTVhMiIsIm5iZiI6MTc2OTk0ODk0Ni4wNDgsInN1YiI6IjY5N2Y0NzEyMTIxM2I0M2Y3NDFjNWJiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ue8PcKURS6zfzcQOexrHCDG2zXVXhlFhdlIg3UThA-c'
  }
};

const handleWheel = (event)=>{
  event.preventDefault;
  cardsRef.current.scrollLeft += event.deltaY;
}


useEffect( () => {

fetch(`https://api.themoviedb.org/3/movie/${Category?Category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));



  cardsRef.current.addEventListener('wheel',handleWheel);
},[])


  return (
    <div className="titlecard">
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
         <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
         <p>{card.original_title}</p>
         </Link>
        })}
      </div>
    </div>
  )
}

export default Titlecards