const gameBoard = (() => {
  let array = [];

  const hasMarkAtIndex = (index) => !!array[index];

  const addMark = (gridCell, index, symbol) => {
    gridCell.textContent = symbol;
    gridCell.classList.add('marked');
    array[index] = symbol;
  };

  const checkForWinner = () => false;

  const reset = () => {
    array = [];
  };

  return {
    addMark, hasMarkAtIndex, checkForWinner, reset,
  };
})();

const playerFactory = (symbol) => {
  const getSymbol = () => symbol;

  return { getSymbol };
};

const game = ((board) => {
  const player1 = playerFactory('X');
  const player2 = playerFactory('O');

  let activePlayer = player1;

  const setActivePlayer = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };

  const playTurn = (gridCell, markIndex) => {
    if (!board.hasMarkAtIndex(markIndex)) {
      board.addMark(gridCell, markIndex, activePlayer.getSymbol());
      setActivePlayer();
      board.checkForWinner();
    }
  };

  const render = () => {
    const boardElement = document.querySelector('.game-board');
    for (let i = 0; i < 9; i += 1) {
      const gridCell = document.createElement('div');
      gridCell.id = i;
      gridCell.addEventListener('click', () => playTurn(gridCell, i));
      boardElement.appendChild(gridCell);
    }
  };

  const play = () => {
    render();
  };

  return { play };
})(gameBoard);

game.play();
