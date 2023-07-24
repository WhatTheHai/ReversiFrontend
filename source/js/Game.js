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

  // Private function init
  const _init = function (url, playerToken, Token) {
    configMap.apiUrl = url
    configMap.playerToken = playerToken
    configMap.Token = Token
    console.log(configMap)
    Game.Data.init(configMap.apiUrl, "production");
    Game.Model.init();
    Game.Template.init();
    _getCurrentGameState()
    setInterval(_getCurrentGameState, 1500)
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
        Game.Reversi.init(stateMap.gameState.board);
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
    init: _init,
    configMap: configMap,
    stateMap: stateMap,
    getCurrentGameState: _getCurrentGameState
  }
})();