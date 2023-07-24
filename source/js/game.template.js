Game.Template = (function () {
  const _getTemplate = function (templateName) {
    let templates = spa_templates.templates;
    for (let tl of templateName.split(".")) {
        templates = templates[tl];
    }
    return templates;
  }

  const _parseTemplate = function (templateName, data) {
    let template = _getTemplate(templateName)
    return template(data);
  }

  const _init = function () {
    console.log('Game template init!')
  }

  return {
    parseTemplate: _parseTemplate,
    init: _init,
    getTemplate: _getTemplate,
  }
})()
