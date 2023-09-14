Handlebars.registerPartial("fiche", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "  <div class=\"black-piece fiche\"></div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isWhitePiece")||(depth0 && lookupProperty(depth0,"isWhitePiece"))||container.hooks.helperMissing).call(alias1,(depth0 != null ? lookupProperty(depth0,"player") : depth0),{"name":"isWhitePiece","hash":{},"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":4,"column":29}}}),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":4,"column":2},"end":{"line":8,"column":9}}})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"white-piece fiche\"></div>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"empty-piece fiche\" onclick=\"Game.Reversi.cellClickListener.call(this)\"></div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isBlackPiece")||(depth0 && lookupProperty(depth0,"isBlackPiece"))||container.hooks.helperMissing).call(alias1,(depth0 != null ? lookupProperty(depth0,"player") : depth0),{"name":"isBlackPiece","hash":{},"data":data,"loc":{"start":{"line":1,"column":6},"end":{"line":1,"column":27}}}),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":9,"column":7}}})) != null ? stack1 : "");
},"useData":true}));
this["spa_templates"] = this["spa_templates"] || {};
this["spa_templates"]["templates"] = this["spa_templates"]["templates"] || {};
this["spa_templates"]["templates"]["gameboard"] = this["spa_templates"]["templates"]["gameboard"] || {};
this["spa_templates"]["templates"]["gameboard"]["body"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"row-container row-"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":2,"column":34},"end":{"line":2,"column":44}}}) : helper)))
    + "\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":7,"column":17}}})) != null ? stack1 : "")
    + "    </div>\r\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"grid-item\" data-row=\""
    + alias1(container.lambda((container.data(data, 1) && lookupProperty(container.data(data, 1),"index")), depth0))
    + "\" data-col=\""
    + alias1(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"index","hash":{},"data":data,"loc":{"start":{"line":4,"column":70},"end":{"line":4,"column":80}}}) : helper)))
    + "\">\r\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"fiche"),depth0,{"name":"fiche","hash":{"player":depth0},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "            </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"board") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":9,"column":9}}})) != null ? stack1 : "");
},"usePartial":true,"useData":true,"useDepths":true});