Game.Reversi = (function () {
    let configMap = {}
  
    const _init = function (gameboard) {
      const boardData = JSON.parse(gameboard)
      _loadBoard(boardData)
    }
  
    const cellClickListener = function () {
      const x = parseInt(this.dataset.col)
      const y = parseInt(this.dataset.row)
      const color = Game.configMap.Color
      if (color == 'black') {
        _showFiche(x, y, 'black')
      } else {
        _showFiche(x, y, 'white')
      }
      
      if (color == 'black' || color == 'white') {
        Game.Reversi.doMove(x, y)
          .then(() => {
            //Succes -> check game state
            return Game.getCurrentGameState();
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
      return Game.Data.put('/game/move', move)
    }
  
    function _showFiche (x, y, color, cell = null) {
      const cellSelector = `.grid-item[data-row="${y}"][data-col="${x}"]`
      cell = cell || document.querySelector(cellSelector)
  
      // Incase the board or cell is incorrect, helpful for debugging
      if (!cell) {
        console.error(`Grid item at row ${x}, column ${y} not found.`)
        return
      }
  
      // Get the current fiche
      const existingFiche = cell.querySelector('.fiche')
  
      // Remove if it's a different colour, main purpose is for when
      // the data changes.
      if (existingFiche) {
        if (existingFiche.classList.contains(`${color}-piece`)) {
          return
        } else {
          existingFiche.remove()
        }
      }
  
      // If it's a nothing piece, it's clickable, else if it's either a black or white piece
      // add the piece and make it unclickable for the user.
      if (color) {
        const fiche = document.createElement('div')
        fiche.className = `${color}-piece fiche`
        cell.appendChild(fiche)
        cell.removeEventListener('click', cellClickListener)
      } else {
        // If the color is blank, remove the fiche from the cell.
        cell.innerHTML = ''
        cell.addEventListener('click', cellClickListener)
      }
    }
  
    function _loadBoard (boardData) {
      const boardContainer = document.getElementById('board-container')
      const boardSize = boardData.length
  
      for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
          const cellSelector = `.grid-item[data-row="${row}"][data-col="${col}"]`
          const existingCell = document.querySelector(cellSelector)
          const cell = existingCell || document.createElement('div')
  
          cell.className = 'grid-item'
          cell.dataset.row = row
          cell.dataset.col = col
  
          if (!existingCell) {
            boardContainer.appendChild(cell)
          }
  
          const cellValue = boardData[row][col]
          let color = ''
  
          if (cellValue === 1) {
            color = 'white'
          } else if (cellValue === 2) {
            color = 'black'
          }
  
          _showFiche(row, col, color, cell)
  
          if (!existingCell && !color) {
            cell.addEventListener('click', cellClickListener)
          }
        }
      }
    }
  
    return {
      init: _init,
      showFiche: _showFiche,
      showBoard: _loadBoard,
      doMove: _doMove
    }
  })();