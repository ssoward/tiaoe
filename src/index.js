// import React from 'react';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// -----------------------------

function Example02() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });
  return (
    <span> <button onClick={() => setCount(count + 1)}> {count} </button> </span>
  );
}
function Example01() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);

  return (
    <span> <button onClick={() => setCount(count + 1)}> {count} </button> </span>
  );
}
// -----------------------------

function Square(props) {
  return (
    <button id={props.init+'_id'} className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        init={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const won = calculateWinner(squares) 
    if (won || squares[i]) {
      if(won && i === 4){
      for(let o = 0; o<9; o++){ 
        document.getElementById(o+'_id').style.color = "black"; 
      }

      this.jumpTo(0);
      let a = new Game();
      this.state = a.state;
 
        console.log('here')
      }
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    const newGame = <button onClick={() => {

      for(let o = 0; o<9; o++){ 
        document.getElementById(o+'_id').style.color = "black"; 
      }

      this.jumpTo(0);
      let a = new Game();
      this.state = a.state;
      // this.state = { history: [ { squares: Array(9).fill(null) } ], stepNumber: 0, xIsNext: true };
      console.log(this.state)

     } 
    }>New Game</button>;

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
        <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{newGame}</div>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
          <div><Example01/></div> <div><Example02/></div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      for(let o = 0; o<3; o++){ document.getElementById(lines[i][o]+'_id').style.color = "red"; }
      console.log(window)
      return squares[a];
    }
  }
  return null;
}
