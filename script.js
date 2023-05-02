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

      const gridImg = document.createElement('img');
      gridCell.appendChild(gridImg);

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
    gridCell.classList.add('marked');

    const img = gridCell.querySelector('img');
    const imgType = symbol === 'X' ? 'times' : 'circle';
    img.src = `./assets/${imgType}.svg`;
    img.classList.add(imgType);

    boardArray[index] = symbol;
  };

  const hasMarkAtIndex = (index) => !!boardArray[index];

  const reset = () => {
    boardArray = [];

    [...boardElement.children].forEach((child) => {
      child.classList.remove('marked');

      const img = child.querySelector('img');
      img.src = '';
      img.classList.remove('times', 'circle');
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
  const getName = () => name;

  const setName = (playerName) => {
    name = playerName;
  };

  return { getSymbol, getName, setName };
};

const validation = (() => {
  const validateField = (input) => {
    if (input.value) {
      input.classList.remove('error');
      return true;
    }
    input.classList.add('error');
    return false;
  };

  const validateForm = (fields) => fields.reduce((a, b) => validateField(b) && a, true);

  return { validateField, validateForm };
})();

const game = ((board, validate) => {
  const player1 = playerFactory(1);
  const player2 = playerFactory(2);

  let activePlayer = player1;
  let isPlaying = false;

  const gameOverDiv = document.querySelector('.game-over');
  const player1Input = document.querySelector('input#player-1');
  const player2Input = document.querySelector('input#player-2');

  const gameOver = (winner) => {
    const message = gameOverDiv.querySelector('.message');

    message.textContent = winner ? `${winner.getName()} Wins!` : 'Draw!';
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

  const start = () => {
    if (!validate.validateForm([player1Input, player2Input])) {
      return;
    }

    player1.setName(player1Input.value);
    player2.setName(player2Input.value);

    const playerForm = document.querySelector('.player-form');
    playerForm.style.display = 'none';

    board.display();

    isPlaying = true;
  };

  const reset = () => {
    board.reset();
    activePlayer = player1;
    gameOverDiv.style.display = 'none';
    isPlaying = true;
  };

  const init = () => {
    board.render(playTurn);

    player1Input.addEventListener('input', () => validate.validateField(player1Input));
    player2Input.addEventListener('input', () => validate.validateField(player2Input));

    const playBtn = document.querySelector('button.play');
    playBtn.addEventListener('click', start);

    const resetBtn = document.querySelector('button.reset');
    resetBtn.addEventListener('click', reset);
  };

  return { init };
})(gameBoard, validation);

game.init();
