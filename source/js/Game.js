const Game = (function (url) {
  //Configuratie en state waarden
  let stateMap = {
    gameState: 0
  }
  let configMap = {
    apiUrl: '',
    playerToken: '',
    Token: '',
    Color: ''
  }

  // Private function init
  const privateInit = function (url, playerToken, Token) {
    configMap.apiUrl = url
    configMap.playerToken = playerToken
    configMap.Token = Token
    console.log(configMap)
    _getCurrentGameState()
    setInterval(_getCurrentGameState, 1500)
    //afterInit()
    //Game.Reversi.init()
  }
  // Waarde/object geretourneerd aan de outer scope

  let initializeOnce = false

  const getColor = function () {
    if (configMap.playerToken == stateMap.gameState.player1Token) {
      return 'white'
    } else {
      return 'black'
    }
  }

  const _getCurrentGameState = function () {
    Game.Model.getGameState(configMap.Token)
      .then(data => {
        stateMap.gameState = data
        Game.Reversi.init()
        if (!initializeOnce) {
          configMap.Color = getColor()
          initializeOnce = true
        }
        if(data.finished == "True") {
          const currentUrl = window.location;
          const redirectUrl = `${currentUrl.protocol}//${currentUrl.host}/Game/Result/${configMap.Token}`;
          console.log(redirectUrl);
          window.location.href = redirectUrl;
        }
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  return {
    init: privateInit,
    configMap: configMap,
    stateMap: stateMap,
    getCurrentGameState: _getCurrentGameState
  }
})('/api/url')

Game.Reversi = (function () {
  let configMap = {}

  const privateInit = function () {
    const boardData = JSON.parse(Game.stateMap.gameState.board)
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

    // If it's a nothing piece, it's clickable, if it's either a black or white piece
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
    init: privateInit,
    showFiche: _showFiche,
    showBoard: _loadBoard,
    doMove: _doMove
  }
})()

Game.Data = (function () {
  let stateMap = { enviroment: 'production' }
  let configMap = {
    mock: [
      {
        url: '/api/Game/Turn',
        data: 0
      }
    ]
  }

  const getMockData = function (url) {
    const mockData = configMap.mock.find(mock => mock.url === url)
    return new Promise((resolve, reject) => {
      resolve(mockData)
    })
  }

  const get = function (url) {
    if (stateMap.enviroment == 'development') {
      return getMockData(url)
    } else if (stateMap.enviroment == 'production') {
      return $.get(Game.configMap.apiUrl + url)
        .then(r => {
          return r
        })
        .catch(e => {
          console.log(e.message)
        })
    }
  }

  const put = function (url, data) {
    if (stateMap.enviroment === 'development') {
      return getMockData(url)
    } else if (stateMap.enviroment === 'production') {
      return fetch(Game.configMap.apiUrl + url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            if (response.status === 401) {
              return response.text().then(message => {
                feedbackWidget.show(`"${message}`, 'danger')
              })
            } else {
              throw new Error('Request failed with status: ' + response.status)
            }
          }
          // Handle successful response
          return response.json()
        })
        .then(data => {
          // Process the data from a successful response
        })
        .catch(error => {
          console.log(error.message) // Display the error message
        })
    }
  }

  const privateInit = function (environment) {
    if (environment != 'production' && environment != 'development') {
      throw new Error('Environment parameter is invalid')
    }
    stateMap.enviroment = environment
  }

  return {
    get: get,
    put: put,
    init: privateInit
  }
})()

Game.Model = (function () {
  let configMap = {}

  const privateInit = function () {}

  const _getWeather = function (url) {
    return Game.Data.get(url)
      .then(data => {
        if (data['main']['temp']) {
          return data
        } else {
          throw new Error('No temperature available in data')
        }
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  const _getGameState = function (token) {
    const url = `/Game/${token}`
    return Game.Data.get(url)
      .then(data => {
        return data
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  return {
    init: privateInit,
    getWeather: _getWeather,
    getGameState: _getGameState
  }
})()
