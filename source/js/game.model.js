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
  })();