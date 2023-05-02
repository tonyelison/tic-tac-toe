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

  const checkDidWin = (symbol) => {
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
    render, addMark, hasMarkAtIndex, checkDidWin, reset,
  };
})();

const playerFactory = (order) => {
  const symbol = ['X', 'O'][order - 1];

  const getSymbol = () => symbol;
  const getOrder = () => order;

  return { getSymbol, getOrder };
};

const game = ((board) => {
  const player1 = playerFactory(1);
  const player2 = playerFactory(2);

  let activePlayer = player1;

  const playTurn = (gridCell, markIndex) => {
    if (!board.hasMarkAtIndex(markIndex)) {
      const activeSymbol = activePlayer.getSymbol();
      board.addMark(gridCell, markIndex, activeSymbol);
      if (board.checkDidWin(activeSymbol)) {
        console.log(`Player ${activePlayer.getOrder()} wins!`);
        board.reset();
        activePlayer = player1;
      } else {
        activePlayer = activePlayer === player1 ? player2 : player1;
      }
    }
  };

  const play = () => {
    board.render(playTurn);
  };

  return { play };
})(gameBoard);

game.play();
