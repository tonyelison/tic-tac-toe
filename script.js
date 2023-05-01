const gameBoard = (() => {
  let array = [];

  const getArray = () => array;

  const addMark = () => {
  };

  const checkForWinner = () => {
  };

  const reset = () => {
    array = [];
  };

  return {
    getArray, addMark, checkForWinner, reset,
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
