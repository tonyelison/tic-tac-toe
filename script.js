const gameBoard = (() => {
  let array = [];
  const boardElement = document.querySelector('.game-board');

  const getArray = () => array;

  const addMark = (gridCell, index) => {
    gridCell.textContent = 'X';
    gridCell.classList.add('marked');
    array[index] = 'X';
  };

  const render = () => {
    for (let i = 0; i < 9; i += 1) {
      const gridCell = document.createElement('div');
      gridCell.id = i;
      gridCell.addEventListener('click', () => addMark(gridCell, i));
      boardElement.appendChild(gridCell);
    }
  };

  const checkForWinner = () => {
  };

  const reset = () => {
    array = [];
  };

  return {
    getArray, render, checkForWinner, reset,
  };
})();

const playerFactory = (symbol) => {
  let score = 0;

  const incrementScore = () => {
    score += 1;
  };

  const getSymbol = () => symbol;

  return { getSymbol, incrementScore };
};

const game = ((board) => {
  const player1 = playerFactory('X');
  const player2 = playerFactory('O');

  const play = () => {
  };

  return { play };
})(gameBoard);

gameBoard.render();
