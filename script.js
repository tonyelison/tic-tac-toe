const gameBoard = (() => {
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

  let array = [];

  const hasMarkAtIndex = (index) => !!array[index];

  const checkForWinner = (player) => {
    const checkIndexSet = (indexSet) => indexSet.every((i) => array[i] === player.getSymbol());
    if (winScenarios.some((scenario) => checkIndexSet(scenario))) {
      return player;
    }
    return false;
  };

  const addMark = (gridCell, index, player) => {
    const playerSymbol = player.getSymbol();

    gridCell.textContent = playerSymbol;
    gridCell.classList.add('marked');
    array[index] = playerSymbol;
  };

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
      board.addMark(gridCell, markIndex, activePlayer);
      setActivePlayer();
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
