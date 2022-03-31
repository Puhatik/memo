import React, { useState, useEffect } from 'react';
import styles from './Game.scss';
import Card from '../Card';
import Header from '../Header';

const initialCards =
            [ {src: "/Avocado.png", matched: false},
              {src: "/Blueberries.png", matched: false},
              {src: "/Broccoli.png", matched: false},
              {src: "/Candy.png", matched: false},
              {src: "/Carrot.png", matched: false},
              {src: "/Cheese.png", matched: false},
              {src: "/Croissant.png", matched: false},
              {src: "/Doughnut.png", matched: false},
              {src: "/Eggplant.png", matched: false},
              {src: "/Grapes.png", matched: false},
              {src: "/Hamburger.png", matched: false},
              {src: "/Lemon.png", matched: false},
              {src: "/Shortcake.png", matched: false},
              {src: "/Strawberry.png", matched: false},
            ];

export default function Game () {
  const [cards, setCards] = useState([])
  const [lifeCount, setLifeCount] = useState(7)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [matchCount, setMatchCount] = useState(0)

  const shuffleCards = () => {
    const shuffleCards = [...initialCards, ...initialCards]
                         .sort(() => Math.random() - 0.5)
                         .map((card) => ({ ...card, id: Math.random() }))

        setCards(shuffleCards)
        setLifeCount(7)
        setChoiceOne(null)
        setChoiceTwo(null)
  }

  const handleChoice = (card) => {
    (choiceOne && choiceOne.id !== card.id) ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
          setTimeout(() => 
            setCards(prevCards => {
            return prevCards.map(card => {
              if (card.src === choiceOne.src) {
                return {...card, matched: true}
              } else { 
                return card
              }
            })
          }), 700)

          setMatchCount(matchCount => matchCount + 1)  
          setTimeout(() => resetTurn(), 700)
      } else {
          setLifeCount(lifeCount => lifeCount - 1)
          setTimeout(() => resetTurn(), 700)
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
  }

  useEffect (() => {
    if (lifeCount === 0 || (matchCount !== 0 && matchCount=== cards.length / 2)) {
      setTimeout(() => 
        setCards(prevCards => {
          return prevCards.map(card => {
              return {...card, matched: true}
            }
          )
      }), 300)
    }
  }, [lifeCount, matchCount])

  return (
    <div className = "wrapper">
      <Header lifeCount={lifeCount} shuffleCards={shuffleCards}/>
      <div className = "content">
        {cards.map(card => (
          <Card 
            key ={card.id}
            card ={card}
            handleChoice = {handleChoice}
            flipped = {card === choiceOne || card === choiceTwo || card.matched}
            disabled = {disabled}
          />
        ))}
      </div>
    </div>
  );
}