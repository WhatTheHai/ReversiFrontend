"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Game = function () {
  //Configuratie en state waarden
  var stateMap = {
    gameState: 0
  };
  var configMap = {
    apiUrl: '',
    playerToken: '',
    Token: '',
    Color: ''
  };

  // Private function init
  var _init = function _init(url, playerToken, Token) {
    configMap.apiUrl = url;
    configMap.playerToken = playerToken;
    configMap.Token = Token;
    configMap.Color = getColor();
    console.log(configMap);
    Game.Data.init(configMap.apiUrl, "production");
    Game.Model.init();
    Game.Template.init();
    pollRate = setInterval(_getCurrentGameState, 2500);
  };
  var initializeOnce = false;
  var getColor = function getColor() {
    if (configMap.playerToken == stateMap.gameState.player1Token) {
      return 'white';
    } else {
      return 'black';
    }
  };
  var _getCurrentGameState = function _getCurrentGameState() {
    Game.Model.getGameState(configMap.Token).then(function (data) {
      stateMap.gameState = data;
      if (!initializeOnce) {
        Game.Reversi.init(stateMap.gameState.board);
        initializeOnce = true;
      } else {
        Game.Reversi.updateBoard(JSON.parse(stateMap.gameState.board));
      }
      if (data.finished == "True") {
        clearInterval(pollRate);
        var currentUrl = window.location;
        var redirectUrl = "".concat(currentUrl.protocol, "//").concat(currentUrl.host, "/Game/Result/").concat(configMap.Token);
        var randomDelay = Math.floor(Math.random() * 2000) + 3000;
        setTimeout(function () {
          window.location.href = redirectUrl;
        }, randomDelay);
      }
    })["catch"](function (error) {
      console.log(error.message);
    });
  };
  return {
    init: _init,
    configMap: configMap,
    stateMap: stateMap,
    getCurrentGameState: _getCurrentGameState
  };
}();
var FeedbackWidget = /*#__PURE__*/function () {
  function FeedbackWidget(elementId) {
    _classCallCheck(this, FeedbackWidget);
    this._elementId = elementId;
  }
  _createClass(FeedbackWidget, [{
    key: "elementId",
    get: function get() {
      //getter, set keyword voor setter methode
      return this._elementId;
    }
  }, {
    key: "show",
    value: function show(message, type) {
      var elem = document.getElementById(this._elementId);
      elem.style.display = "block";
      var textElement = elem.querySelector('.feedback-text--text');
      textElement.textContent = message;
      if (type == "success") {
        $(elem).attr("class", "feedback-container--success");
        $(".feedback-text--emoji").text("✔️");
      } else {
        $(elem).attr("class", "feedback-container--danger");
        $(".feedback-text--emoji").text("❌");
      }
      $(elem).addClass("fade-in");
      this.log({
        message: message,
        type: type
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      var elem = document.getElementById(this._elementId);
      elem.classList.add("fade-out");
      setTimeout(function () {
        elem.style.display = "none";
        elem.classList.remove("fade-out");
        elem.classList.remove("fade-in");
      }, 749);
    }
  }, {
    key: "log",
    value: function log(message) {
      var allMessages = JSON.parse(localStorage.getItem("feedback_widget"));
      if (allMessages == null) {
        allMessages = [];
      } else if (allMessages.length >= 10) {
        allMessages.splice(0, 1);
      }
      allMessages.push(message);
      localStorage.setItem("feedback_widget", JSON.stringify(allMessages));
    }
  }, {
    key: "removeLog",
    value: function removeLog() {
      localStorage.removeItem("feedback_widget");
    }
  }, {
    key: "history",
    value: function history() {
      var allMessages = JSON.parse(localStorage.getItem("feedback_widget"));
      var result = "";
      allMessages.forEach(function (message) {
        result += "type ".concat(message["type"], " - ").concat(message["message"], " \n");
      });
      console.log(result);
    }
  }]);
  return FeedbackWidget;
}();
Game.Data = function () {
  var stateMap = {
    enviroment: 'production'
  };
  var configMap = {
    url: "",
    mock: [{
      url: '/api/Game/Turn',
      data: 0
    }]
  };
  var getMockData = function getMockData(url) {
    var mockData = configMap.mock.find(function (mock) {
      return mock.url === url;
    });
    return new Promise(function (resolve, reject) {
      resolve(mockData);
    });
  };
  var get = function get(url) {
    if (stateMap.enviroment == 'development') {
      return getMockData(url);
    } else if (stateMap.enviroment == 'production') {
      return $.get(configMap.url + url).then(function (r) {
        return r;
      })["catch"](function (e) {
        console.log(e.message);
      });
    }
  };
  var getDogFact = function getDogFact() {
    var url = 'https://dogapi.dog/api/v2/facts';
    return get(url);
  };
  var put = function put(url, data) {
    if (stateMap.enviroment === 'development') {
      return getMockData(url);
    } else if (stateMap.enviroment === 'production') {
      return fetch(configMap.url + url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(function (response) {
        if (!response.ok) {
          if (response.status === 400 || response.status === 401) {
            return response.text().then(function (message) {
              feedbackWidget.show("".concat(message), 'danger');
            });
          } else {
            throw new Error('Request failed with status: ' + response.status);
          }
        }
        // Handle successful response
        return response.json();
      }).then(function (data) {
        // Process the data from a successful response
      })["catch"](function (error) {
        console.log(error.message); // Display the error message
      });
    }
  };

  var _init = function _init(url, environment) {
    configMap.url = url;
    if (environment != 'production' && environment != 'development') {
      throw new Error('Environment parameter is invalid');
    }
    stateMap.enviroment = environment;
  };
  return {
    get: get,
    put: put,
    init: _init,
    getDogFact: getDogFact
  };
}();
Game.Model = function () {
  var configMap = {};
  var privateInit = function privateInit() {};
  var _getWeather = function _getWeather(url) {
    return Game.Data.get(url).then(function (data) {
      if (data['main']['temp']) {
        return data;
      } else {
        throw new Error('No temperature available in data');
      }
    })["catch"](function (error) {
      console.log(error.message);
    });
  };
  var _getGameState = function _getGameState(token) {
    var url = "/Game/".concat(token);
    return Game.Data.get(url).then(function (data) {
      return data;
    })["catch"](function (error) {
      console.log(error.message);
    });
  };
  return {
    init: privateInit,
    getWeather: _getWeather,
    getGameState: _getGameState
  };
}();
Game.Reversi = function () {
  var configMap = {};
  var _init = function _init(gameboard) {
    var boardData = JSON.parse(gameboard);
    _initBoard(boardData);
  };
  var cellClickListener = function cellClickListener() {
    var gridItem = event.target.closest('.empty-piece');
    if (!gridItem) return; // Click occurred outside a grid item

    var x = parseInt(gridItem.parentElement.dataset.col);
    var y = parseInt(gridItem.parentElement.dataset.row);
    var color = Game.configMap.Color;
    _showFiche(x, y, color === 'black' ? 'black' : 'white');
    if (color == 'black' || color == 'white') {
      Game.Reversi.doMove(x, y).then(function () {
        //Succes -> check game state
        return Game.getCurrentGameState();
      })["catch"](function (error) {
        console.log(error.message);
      });
    }
  };
  var _doMove = function _doMove(x, y) {
    var move = {
      X: x,
      Y: y,
      GameToken: Game.configMap.Token,
      PlayerToken: Game.configMap.playerToken
    };
    return Game.Data.put('/game/move', move);
  };
  function _showFiche(x, y, color) {
    var cellSelector = ".grid-item[data-row=\"".concat(y, "\"][data-col=\"").concat(x, "\"]");
    var cellElement = document.querySelector(cellSelector);
    var fiche = document.createElement("div");
    fiche.classList.add("fiche");
    fiche.classList.add("".concat(color, "-piece"));
    cellElement.innerHTML = "";
    cellElement.append(fiche);
  }
  function _initBoard(boardData) {
    var boardContainer = document.getElementById('board-container');
    boardContainer.innerHTML = Game.Template.parseTemplate("gameboard.body", {
      board: boardData
    });
  }
  function _updateBoard(boardData) {
    var boardContainer = document.getElementById('board-container');
    var gridItems = boardContainer.querySelectorAll('.grid-item');
    var _iterator = _createForOfIteratorHelper(gridItems),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var gridItem = _step.value;
        var x = parseInt(gridItem.dataset.col);
        var y = parseInt(gridItem.dataset.row);
        var color = boardData[y][x];

        // Get the current fiche element from the gridItem
        var currentFiche = gridItem.querySelector(".fiche");
        var currentColorValue = void 0; // To store the equivalent color value: none = 0, white = 1, black = 2

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
          var fiche = document.createElement("div");
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
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return {
    init: _init,
    showFiche: _showFiche,
    initBoard: _initBoard,
    updateBoard: _updateBoard,
    doMove: _doMove,
    cellClickListener: cellClickListener
  };
}();
Game.Template = function () {
  var _getTemplate = function _getTemplate(templateName) {
    var templates = spa_templates.templates;
    var _iterator2 = _createForOfIteratorHelper(templateName.split('.')),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var tl = _step2.value;
        templates = templates[tl];
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return templates;
  };
  var _parseTemplate = function _parseTemplate(templateName, data) {
    var template = _getTemplate(templateName);
    return template(data);
  };
  var _init = function _init() {
    Handlebars.registerHelper('isWhitePiece', function (player) {
      return player === 1;
    });
    Handlebars.registerHelper('isBlackPiece', function (player) {
      return player === 2;
    });
  };
  return {
    parseTemplate: _parseTemplate,
    init: _init,
    getTemplate: _getTemplate
  };
}();