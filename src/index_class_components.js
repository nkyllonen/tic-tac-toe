import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

/*
  THIS IMPLEMENTATION USES CLASS COMPONENTS
    - does not check for a winner
    - alternates between 'X' and 'O' - starting with 'X'
    - `Board` maintains game state
    - `Square` is a controlled component
*/

class Square extends React.Component {
  // Square is a "controlled component" since they only do as they're told- mindless, stateless
  render() {
    return (
      // button will be re-rendered when clicked
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    // Board should be the one-source-of-truth and maintain the game state
    super(props);

    // initialize state
    this.state = {
      currentPlayer: 'X',
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    // `.slice()`: make a copy of the `squares` array
    const squares = this.state.squares.slice();
    squares[i] = this.state.currentPlayer;

    // TODO: check for a winner

    this.setState({
      currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X',
      squares: squares
    });
  }

  renderSquare(i) {
    // "pass a prop" into Square component
    return (
      <Square
        onClick={() => this.handleClick(i)}
        value={this.state.squares[i]} />
    );
  }

  render() {
    const status = 'Next player: ' + this.state.currentPlayer;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
