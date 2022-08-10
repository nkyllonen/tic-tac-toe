import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

/*
  THIS IMPLEMENTATION USES FUNCTION COMPONENTS
    - determines winner correctly
*/

function Square(props) {
  // no need to maintain its own state, only needs to render --> make it a function!
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  );
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

    // check for a winner or for a click on an occupied index
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.currentPlayer;
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
        // onClick={() => console.log(i)}
        value={this.state.squares[i]} />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;

    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + this.state.currentPlayer;
    }

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

function calculateWinner(squares) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // check if any of the winning lines are occupied by the same player
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
    return null;
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
