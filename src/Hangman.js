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

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    let randW = randomWord();
    this.state = { nWrong: 0, guessed: new Set(), answer: randW, gameEnd: false };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleReset = this.handleReset.bind(this);
    console.log(randW);
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
    console.log(this.state.nWrong, this.props.maxWrong);
    if (this.state.nWrong + 1 >= this.props.maxWrong) {
      gameEndTemp = true;
    }
    this.setState(st => ({
      ...this.state,
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
      gameEnd: gameEndTemp
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    var buttons = 'abcdefghijklmnopqrstuvwxyz'.split('').map(ltr => (
      <button
        value={ltr}
        key={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));

    var gameOver = `Game is over. The correct word was ${this.state.answer}`;

    return !this.state.gameEnd ? buttons : gameOver;
  }
  handleReset(e) {
    let randW = randomWord();
    this.setState({ ...this.state, nWrong: 0, guessed: new Set(), answer: randW, gameEnd: false });
    console.log(randW);
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
          <p className="Hangman-btns">{this.generateButtons()}</p>
        </div>
        <div>
          <button class="rstBtn" onClick={this.handleReset}>
            Reset Game !!!
          </button>
        </div>
      </div>
    );
  }
}

export default Hangman;
