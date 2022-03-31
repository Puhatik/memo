import React, {useState} from 'react';
import classNames from 'classnames';
import styles from './Card.scss';

export default function Card ({ card, handleChoice, flipped, disabled }) {

  const handleClick = () => {
    if(!disabled && !card.matched) {
      handleChoice(card)
    }
  }

  return (
    <button className={classNames("card", {
                                  "is-flipped": flipped,
                                  "is-matched": card.matched
                      })}
            onClick = {handleClick}>
      {flipped && !card.matched && <img className = "img" width={50} height={50} src={card.src}/>}
    </button>
  );
}
