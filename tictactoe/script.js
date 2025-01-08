/**
 * Steps:
 * 1) Break the application down to simple modules that builds up on each other
 * 2) for each of the modules, think about how each function can be coded up with each other
 * 3) start with simple DOM for displaying on the webpage first and expand from there, coding to console may be hard to visualise
 *
 * Each game has a
 * 1) game board (to display and interact with the game)
 *    - initialise the board (private function so hackers cant mess with setting up)
 *    - create player object for the game
 *    - render the board at the start and after each move
 *    - update the board with player's token
 *    - display board publicly
 *
 * 2) game controller (for logic and storing players data)
 *    - game initialisation
 *    - placing player's token
 *    - restart game at any time
 *
 * 3) win/tie condition check and rendering messages.
 *    - check win condition after each move
 *    - check tie condition after when board is full
 *    - print message accordingly
 */

const GameBoard = (() => {
  // initialise the board at start of page as array of empty "cells"
  const board = [];

  for (let i = 0; i < 9; i++) {
    board[i] = "";
  }

  //function to create player object for game controller
  const createPlayer = (name, mark) => {
    return {
      name,
      mark,
    };
  };

  //function to render game board at start and after each move
  const render = () => {
    //insert square div string into DOM after start button clicked or move has been made
    let boardHTML = "";

    board.forEach((square, index) => {
      boardHTML += `<div class="square" id="${index}">${square}</div>`;
    });

    document.querySelector("#gameboard").innerHTML = boardHTML;

    //make square clickable by attaching event listener into each square
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        GameController.placeToken(event);
      });
    });
  };

  //function to update the square with player's token or empty cell at restart
  const update = (index, value) => {
    board[index] = value;
    render();
  };

  //function to get board information after initialisation
  const getBoard = () => board;

  //export functions
  return {
    createPlayer,
    render,
    update,
    getBoard,
  };
})();

const GameController = (() => {
  // initialising relevant variables
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  //function to run at start of game (after clicking start button)
  const start = () => {
    //create player object based on name input
    players = [
      GameBoard.createPlayer(document.querySelector("#player1").value, "X"),
      GameBoard.createPlayer(document.querySelector("#player2").value, "O"),
    ];

    //set first player and game over flag
    currentPlayerIndex = 0;
    gameOver = false;

    //render game board
    GameBoard.render();
  };

  //function to place player's token in the game board
  const placeToken = (event) => {
    //if game is alrd over, then no need to place token
    if (gameOver) {
      return;
    }

    //from event listener, extract square id that was clicked
    let index = event.target.id;

    //if not empty, do not update and exit function (allows player to click another box)
    if (GameBoard.getBoard()[index] !== "") {
      return;
    }

    //update square with current player's token
    GameBoard.update(index, players[currentPlayerIndex].mark);

    //win and tie condition check, rendering corresponding messages, also update game over flag
    if (Condition.win(GameBoard.getBoard(), players[currentPlayerIndex].mark)) {
      gameOver = true;
      Condition.renderMsg(`${players[currentPlayerIndex].name} has won!`);
    } else if (Condition.tie(GameBoard.getBoard())) {
      gameOver = true;
      Condition.renderMsg(`It's a tie!`);
    }

    //swap turns --> this works because 1-0 = 1, 1-1 = 0 so 0 --> 1 --> 0 --> ...
    currentPlayerIndex = 1 - currentPlayerIndex;
  };

  //function to restart game
  const restart = () => {
    //update board with empty cells
    for (let i = 0; i < 9; i++) {
      GameBoard.update(i, "");
    }

    //render game board
    GameBoard.render();

    //reset message display
    document.querySelector("#message").innerHTML = "";

    //reset to first player
    currentPlayerIndex = 0;
    gameOver = false;
  };

  //export relevant functions
  return {
    start,
    placeToken,
    restart,
  };
})();

const Condition = (() => {
  //function to check win condition
  const win = (board, mark) => {
    //hardcorded win condition combinations --> TODO: update to loop logic
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    //if any winning combinations found, while cell is not empty, then game is over
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] === board[b] && board[a] === board[c] && board[a] === mark) {
        return true;
      }
    }

    //if check fails, then game is not over
    return false;
  };

  //function to check tie condition
  const tie = (board) => {
    //return boolean value for every cell is not empty
    //if game hasnt been won by now, it's a tie
    return board.every((cell) => cell !== "");
  };

  //function to render corresponding messages
  const renderMsg = (message) =>
    (document.querySelector("#message").innerHTML = message);

  //export corresponding functions
  return {
    win,
    tie,
    renderMsg,
  };
})();

//find start button and restart button on the DOM
const startButton = document.querySelector("#startButton");
const restartButton = document.querySelector("#restartButton");

//attach corresponding functions as event listeners
startButton.addEventListener("click", () => {
  GameController.start();
});

restartButton.addEventListener("click", () => {
  GameController.restart();
});
