import React, { Component } from 'react';
import './Hangman.css';
import img1 from './assets/images/1.jpg';
import img0 from './assets/images/0.jpg';
import img2 from './assets/images/2.jpg';
import img3 from './assets/images/3.jpg';
import img4 from './assets/images/4.jpg';
import img5 from './assets/images/5.jpg';
import img6 from './assets/images/6.jpg';
import { randomWord } from './words';
import AlphaButttons from './AlphaButtons';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    let randW = randomWord();
    this.state = { nWrong: 0, guessed: new Set(), answer: randW, gameEnd: false, gameWin: false };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleReset = this.handleReset.bind(this);
    // console.log(randW);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer.split('').map(ltr => (this.state.guessed.has(ltr) ? ltr : '_'));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    let gameEndTemp = false;
    let gameWin = false;
    this.setState(
      st => ({
        ...this.state,
        guessed: st.guessed.add(ltr),
        nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
        gameEnd: gameEndTemp,
        gameWin: gameWin
      }),
      () => {
        // console.log(this.state.nWrong, this.props.maxWrong);

        if (this.state.nWrong >= this.props.maxWrong) {
          this.setState({ ...this.state, gameEnd: true });
        }
        if (this.state.answer === this.guessedWord().join('')) {
          this.setState({ ...this.state, gameWin: true });
        }
      }
    );
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    var buttons = (
      <AlphaButttons
        handleGuess={this.handleGuess}
        guessed={this.state.guessed}
        inputAlphas="abcdefghijklmnopqrstuvwxyz"
      />
    );
    var gameOver = `Game is over. The correct word was ${this.state.answer}`;
    var gameWin = 'Congratulations!!! You guessed the correct word';

    if (this.state.gameEnd) {
      return gameOver;
    } else if (this.state.gameWin) {
      return gameWin;
    } else {
      return buttons;
    }
  }
  handleReset(e) {
    let randW = randomWord();
    this.setState({
      ...this.state,
      nWrong: 0,
      guessed: new Set(),
      answer: randW,
      gameEnd: false,
      gameWin: false
    });
    // console.log(randW);
  }
  /** render: render game */
  render() {
    return (
      <div>
        <div className="Hangman">
          <h1>Hangman</h1>
          <img
            src={this.props.images[this.state.nWrong]}
            alt={`Wrong Guess Count : ${this.state.nWrong}/${this.props.maxWrong}`}
          />
          <p className="Hangman-wrongGuess">{`You did ${this.state.nWrong}/${
            this.props.maxWrong
          } wrong guesses`}</p>
          <p className="Hangman-word">{this.guessedWord()}</p>
          <div className="Hangman-btns">{this.generateButtons()}</div>
        </div>
        <div>
          <button className="rstBtn" onClick={this.handleReset}>
            Reset Game !!!
          </button>
        </div>
      </div>
    );
  }
}

export default Hangman;
