Game.API = (function () {

    const _init = function () { }

    const apiLink = function () {
        return Game.configMap.apiUrl;
    }

    const getGameState = function (token) {
        const url = apiLink() + `/Game/${token}`;
        return Game.Data.get(url)
            .then(data => {
                return data
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const makeMove = function (move) {
        return Game.Data.put(apiLink() + '/Game/move', move)
    }

    const getDogFact = function () {
        let url = 'https://dogapi.dog/api/v2/facts';
        return Game.Data.get(url)
            .then(data => {
                return data
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return {
        init: _init,
        getGameState: getGameState,
        makeMove: makeMove,
        getDogFact: getDogFact
    }
})();