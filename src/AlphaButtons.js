import React, { Component } from 'react';

export default class AlphaButtons extends Component {
  genButtons() {
    // console.log(this.props.inputAlphas);
    return this.props.inputAlphas.split('').map(ltr => (
      <button
        value={ltr}
        key={ltr}
        onClick={this.props.handleGuess}
        disabled={this.props.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }
  render() {
    return (
      <div>
        <div>{this.genButtons()}</div>
      </div>
    );
  }
}
