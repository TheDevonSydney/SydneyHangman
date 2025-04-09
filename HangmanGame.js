import './App.css';
import React from 'react';
import SingleLetterSearchbar from './SingleLetterSearchBar';

const pics = ['noose.png', 'upperBody.png', 'upperandlowerbody.png', '1arm.png', 'botharms.png','1leg.png', 'Dead.png'];
const words = ["Morehouse", "Spelman", "Basketball", "Table", "Museum", "Excellent", "Fun", "React"];
class HangmanGame extends React.Component {
  state = {
    wordList: words,
    curWord: words[Math.floor(Math.random() * words.length)].toUpperCase(),
    lifeLeft: 0,
    usedLetters: [],
    correctGuesses: new Set(),
    playerName: "",
    gameOver: false,
  }
  componentDidMount() {
    this.getPlayerName();
    }

  getPlayerName = () => {
    const name = prompt("Please enter your name")
    this.setState({
      playerName: name || "Player"
    });
  }
  startNewGame = () => {
    this.setState({
      curWord: words[Math.floor(Math.random() * words.length)].toUpperCase(), 
      lifeLeft: 0,
      usedLetters: [],
      correctGuesses: new Set(),
      gameOver: false
    });
  }
handleGuess = (letter) => {
  const upperLetter = letter.toUpperCase();
  const { curWord, usedLetters, lifeLeft, correctGuesses } = this.state;

  if (usedLetters.includes(upperLetter) || this.state.gameOver) return;

  let newLifeLeft=lifeLeft;
  let newCorrectGuesses=new Set(correctGuesses);

  if (curWord.includes(upperLetter)) {
    newCorrectGuesses.add(upperLetter);
  } else {
    newLifeLeft +=1;
  }

  const isGameOver = newLifeLeft === pics.length - 1;

    this.setState({
      usedLetters: [...usedLetters, upperLetter],
      lifeLeft: newLifeLeft,
      correctGuesses: newCorrectGuesses,
      gameOver: isGameOver
    });
  };

  displayWord = () => {
    return this.state.curWord
      .split("")
      .map((letter) => (this.state.correctGuesses.has(letter) ? letter : "_"))
      .join(" ");
  };

  render() {
    const word = this.displayWord();
    const { lifeLeft, gameOver, curWord, playerName } = this.state;
    const currentPic = pics[lifeLeft];

    return (
      <div>
        <h1>Hangman Game</h1>
        <h2>Welcome, {playerName}!</h2>
        <img src={currentPic} alt="Hangman Stage" style={{ height: '300px' }} />

        {gameOver ? (
          <div>
            <h2 style={{ color: 'red' }}>Game Over</h2>
            <p>The word was: <strong>{curWord}</strong></p>
            <button onClick={this.startNewGame}>Try Again</button>
          </div>
        ) : (
          <div>
            <button onClick={this.startNewGame}>New Game</button>
            <p>Word: {word}</p>
            <SingleLetterSearchbar onSearch={this.handleGuess} />
          </div>
        )}
      </div>
    );
  }
}

export default HangmanGame;
