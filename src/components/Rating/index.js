import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import './rating.scss'

export default function Rating({ numRating, review }) {
  return (
    <>
      <p>
        { numRating >=1 ? <BsStarFill /> : numRating >= 0.5 ? <BsStarHalf /> : <BsStar /> }
        { numRating >=2 ? <BsStarFill /> : numRating >= 1.5 ? <BsStarHalf /> : <BsStar /> }
        { numRating >=3 ? <BsStarFill /> : numRating >= 2.5 ? <BsStarHalf /> : <BsStar /> }
        { numRating >=4 ? <BsStarFill /> : numRating >= 3.5 ? <BsStarHalf /> : <BsStar /> }
        { numRating >=5 ? <BsStarFill /> : numRating >= 4.5 ? <BsStarHalf /> : <BsStar /> }
        <span>{review} {review > 1 ? `Reviews` : 'Review'}</span>      
      </p>
    </>
  );
}
