Game.Model = (function () {
  let configMap = {}

  const _Init = function () {}

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

  return {
    init: _Init,
    getWeather: _getWeather
  }
})()
