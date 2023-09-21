Game.Data = (function () {
  let stateMap = { enviroment: 'production' }
  let configMap = {
    url: '',
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
      return $.get(url)
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
      return fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            if (response.status === 400 || response.status === 401) {
              return response.text().then(message => {
                feedbackWidget.show(`${message}`, 'danger')
              })
            } else {
              throw new Error('Request failed with status: ' + response.status)
            }
          }
          return response.json()
        })
        .catch(error => {
          console.log(error.message) // Display the error message
        })
    }
  }

  const _init = function (url, environment) {
    configMap.url = url
    if (environment != 'production' && environment != 'development') {
      throw new Error('Environment parameter is invalid')
    }
    stateMap.enviroment = environment
  }

  return {
    get: get,
    put: put,
    init: _init
  }
})()
