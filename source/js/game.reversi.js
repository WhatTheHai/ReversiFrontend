Game.Reversi = (function () {
  let configMap = {}

  const _init = function (gameboard) {
    const boardData = JSON.parse(gameboard)
    _initBoard(boardData)
  }

  const cellClickListener =  function () {
    const gridItem = event.target.closest('.empty-piece');
    if (!gridItem) return; // Click occurred outside a grid item


    const x = parseInt(gridItem.parentElement.dataset.col)
    const y = parseInt(gridItem.parentElement.dataset.row)
    const color = Game.configMap.Color
    _showFiche(x, y, color === 'black' ? 'black' : 'white');
    if (color == 'black' || color == 'white') {
      Game.Reversi.doMove(x, y)
        .then(() => {
          //Succes -> check game state
          return Game.getCurrentGameState()
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  }

  const _doMove = function (x, y) {
    const move = {
      X: x,
      Y: y,
      GameToken: Game.configMap.Token,
      PlayerToken: Game.configMap.playerToken
    }
    return Game.API.makeMove(move)
  }

  function _showFiche (x, y, color) {
    const cellSelector = `.grid-item[data-row="${y}"][data-col="${x}"]`
    let cellElement = document.querySelector(cellSelector);

    let fiche = document.createElement("div");
    fiche.classList.add("fiche");
    fiche.classList.add(`${color}-piece`);

    cellElement.innerHTML = "";
    cellElement.append(fiche);
  }

  function _initBoard (boardData) {
    const boardContainer = document.getElementById('board-container')

    boardContainer.innerHTML = Game.Template.parseTemplate("gameboard.body", {
        board: boardData,
    });
  }

  function _updateBoard(boardData) {
    const boardContainer = document.getElementById('board-container');
    const gridItems = boardContainer.querySelectorAll('.grid-item');
  
  
    for (const gridItem of gridItems) {
      const x = parseInt(gridItem.dataset.col);
      const y = parseInt(gridItem.dataset.row);
      const color = boardData[y][x];
  
      // Get the current fiche element from the gridItem
      const currentFiche = gridItem.querySelector(".fiche");
      let currentColorValue;

      if (currentFiche) {
        // If there's a fiche, determine its current color value
        if (currentFiche.classList.contains("white-piece")) {
          currentColorValue = 1;
        } else if (currentFiche.classList.contains("black-piece")) {
          currentColorValue = 2;
        } else {
          currentColorValue = 0;
        }
      } else {
        currentColorValue = 0;
      }

      if (currentColorValue !== color) {
        // Colors don't match, replace the fiche
        gridItem.innerHTML = ""; // Clear any existing fiche
        const fiche = document.createElement("div");
        if (color === 1) {
          fiche.classList.add("fiche", "white-piece");
        } else if (color === 2) {
          fiche.classList.add("fiche", "black-piece");
        } else {
          fiche.classList.add("fiche", "empty-piece");
          fiche.addEventListener("click", cellClickListener);
        }
        gridItem.append(fiche);
      }
    }
  }
  

  return {
    init: _init,
    showFiche: _showFiche,
    initBoard: _initBoard,
    updateBoard: _updateBoard,
    doMove: _doMove,
    cellClickListener: cellClickListener
  }
})()
