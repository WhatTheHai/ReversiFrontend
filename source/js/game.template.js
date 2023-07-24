Game.Template = (function () {
    const getTemplate = function (templateName) {
      const templateNames = templateName.split('.');
      let template = sp
    }
  
    const _parseTemplate = function (templateName, data) {
      return getTemplate(templateName)(data);
    }
  
    const _init = function () {
        console.log("Game template init!");
    }
  
    return {
      parseTemplate : _parseTemplate,
      init : _init
    }
})();