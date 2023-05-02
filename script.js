const gameBoard = (() => {
  let boardArray = [];

  const winScenarios = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  const boardElement = document.querySelector('.game-board');

  const render = (cellAction) => {
    for (let i = 0; i < 9; i += 1) {
      const gridCell = document.createElement('div');
      gridCell.id = i;
      gridCell.addEventListener('click', () => cellAction(gridCell, i));
      boardElement.appendChild(gridCell);
    }
  };

  const display = () => {
    boardElement.style.display = 'grid';
  };

  const checkDidWin = (symbol) => {
    if (boardArray.filter(Boolean).length === 9) {
      return 'draw';
    }
    const didWin = (indexSet) => indexSet.every((i) => boardArray[i] === symbol);
    return winScenarios.some((scenario) => didWin(scenario));
  };

  const addMark = (gridCell, index, symbol) => {
    gridCell.textContent = symbol;
    gridCell.classList.add('marked');
    boardArray[index] = symbol;
  };

  const hasMarkAtIndex = (index) => !!boardArray[index];

  const reset = () => {
    boardArray = [];
    [...boardElement.children].forEach((child) => {
      child.textContent = '';
      child.classList.remove('marked');
    });
  };

  return {
    render, display, addMark, hasMarkAtIndex, checkDidWin, reset,
  };
})();

const playerFactory = (order) => {
  const symbol = ['X', 'O'][order - 1];
  let name = '';

  const getSymbol = () => symbol;
  const getOrder = () => order;
  const getName = () => name;

  const setName = (playerName) => {
    name = playerName;
  };

  return {
    getSymbol, getOrder, getName, setName,
  };
};

const game = ((board) => {
  const player1 = playerFactory(1);
  const player2 = playerFactory(2);

  let activePlayer = player1;
  let isPlaying = false;

  const gameOverDiv = document.querySelector('.game-over');

  const gameOver = (winner) => {
    const message = gameOverDiv.querySelector('.message');

    message.textContent = winner ? `Player ${winner.getOrder()} Wins!` : 'Draw!';
    gameOverDiv.style.display = 'block';

    isPlaying = false;
  };

  const playTurn = (gridCell, markIndex) => {
    if (isPlaying && !board.hasMarkAtIndex(markIndex)) {
      const activeSymbol = activePlayer.getSymbol();

      board.addMark(gridCell, markIndex, activeSymbol);
      const result = board.checkDidWin(activeSymbol);
      if (result) {
        gameOver(result === 'draw' ? null : activePlayer);
      } else {
        activePlayer = activePlayer === player1 ? player2 : player1;
      }
    }
  };

  const setPlayerNames = () => {
    player1.setName(document.querySelector('input#player-1').value);
    player2.setName(document.querySelector('input#player-2').value);
  };

  const renderBoard = () => {
    board.render(playTurn);

    const playerForm = document.querySelector('.player-form');
    const playBtn = document.querySelector('button.play');
    playBtn.addEventListener('click', () => {
      setPlayerNames();
      board.display();
      playerForm.style.display = 'none';
      isPlaying = true;
    });

    const resetBtn = document.querySelector('button.reset');
    resetBtn.addEventListener('click', () => {
      board.reset();
      activePlayer = player1;
      gameOverDiv.style.display = 'none';
      isPlaying = true;
    });
  };

  return { renderBoard };
})(gameBoard);

game.renderBoard();
