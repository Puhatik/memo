import styles from './Header.scss';

export default function Header({ shuffleCards, lifeCount }) {

  const handleClick = () => {
    shuffleCards();
  }

  return (
    <header>
      <div className="header-left">
        <h1>Мемо</h1>
      </div>
      <div className="header-right">
        <button className = "startButton" onClick = {handleClick}>Новая игра</button>
        <img className = "heart"  src= {lifeCount === 0 ? "/Broken-heart.svg" : "/heart.svg"} alt="Heart" />
        <span>
          {lifeCount}
        </span>
      </div>
    </header>
  );
}
