const Game = (function (url) {
  //Configuratie en state waarden
  let stateMap = {}
  let configMap = {
    apiUrl: ''
  }

  // Private function init
  const privateInit = function (afterInit) {
    console.log(configMap.apiUrl)
    setInterval(_getCurrentGameState, 2000)
    afterInit()
  }
  // Waarde/object geretourneerd aan de outer scope

  const _getCurrentGameState = function () {
    stateMap.gameState = Game.Model.getGameState()
  }

  return {
    init: privateInit
  }
})('/api/url')

Game.Reversi = (function () {
  let configMap = {}

  const privateInit = function () {
    console.log('Hallo vanuit privateinit')
  }
  return {
    init: privateInit
  }
})()

Game.Data = (function () {
  let stateMap = { enviroment: 'development' }
  let configMap = {
    mock: [
      {
        url: 'api/Game/Turn',
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
    } else if (stateMap == 'production') {
      return $.get(url)
        .then(r => {
          return r
        })
        .catch(e => {
          console.log(e.message)
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

  const _getGameState = function () {
    return Game.Data.get('/api/Spel/Beurt/<token>')
      .then(data => {
        if (data < 0 || data > 2) {
          throw new Error(`Value gameState is invalid: ${data}`)
        } else {
          return data
        }
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
