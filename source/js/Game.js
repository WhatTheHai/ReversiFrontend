const Game = (function () {
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

  let pollRate

  // Private function init
  const _init = function (url, playerToken, Token) {
    configMap.apiUrl = url
    configMap.playerToken = playerToken
    configMap.Token = Token
    configMap.Color = getColor()
    Game.Data.init(configMap.apiUrl, 'production')
    Game.Model.init()
    Game.Template.init()
    Game.API.init()
    pollRate = setInterval(_getCurrentGameState, 2500)
  }

  let initializeOnce = false

  const getColor = function () {
    if (configMap.playerToken == stateMap.gameState.player1Token) {
      return 'white'
    } else {
      return 'black'
    }
  }

  const _getCurrentGameState = function () {
    Game.API.getGameState(configMap.Token)
      .then(data => {
        if (!initializeOnce) {
          stateMap.gameState = data
          Game.Reversi.init(stateMap.gameState.board)
          Game.Stats.init()
          initializeOnce = true
        } else {
          if (stateMap.gameState.board != data.board) {
            // Board has been updated
            // As a hindsight, I could've checked for this and then update the board, but due to time constraint, I cannot change this.
            Game.Stats.addOccupiedChartData(data.board)
            //data.board = newer board, gamestate is older board
            Game.Stats.addCapturedChartData(
              stateMap.gameState.board,
              data.board
            )
          }
          stateMap.gameState = data
          Game.Reversi.updateBoard(JSON.parse(stateMap.gameState.board))
          Game.Reversi.turnStatus(stateMap.gameState.isTurn)
        }
        if (data.finished == 'True') {
          clearInterval(pollRate)
          const currentUrl = window.location
          const redirectUrl = `${currentUrl.protocol}//${currentUrl.host}/Game/Result/${configMap.Token}`
          const randomDelay = Math.floor(Math.random() * 2000) + 3000
          setTimeout(() => {
            window.location.href = redirectUrl
          }, randomDelay)
        }
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  return {
    init: _init,
    configMap: configMap,
    stateMap: stateMap,
    getCurrentGameState: _getCurrentGameState
  }
})()
