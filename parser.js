/**
 * Parser for a tiny subset of the handlebars system.
 * All HBS files are generated into a static HTML page under the build directory.
 *
 * Supported syntax:
 *  {{var}}
 *  {{> partial }}
 *  {{#helper 'arg1' 'arg2'}}
 */

var fs = require("fs");
var config = require("./site.config");

const partialsMap = {};

for (const partialFn of fs.readdirSync(config.partialsDirectory)) {
  if (!partialFn.endsWith(`.${config.extension}`)) {
    continue;
  }
  const contents = fs
    .readFileSync(`${config.partialsDirectory}/${partialFn}`)
    .toString();
  partialsMap[partialFn.slice(0, -4)] = contents;
}

function renderReExpr(content, expr, replacer) {
  return content.replace(expr, replacer);
}

function renderVariables(hbsContent, variableMap) {
  return renderReExpr(
    hbsContent,
    /{{(?<varname>.*)}}/gi,
    function (_, varname) {
      return variableMap[varname];
    }
  );
}

function renderPartials(hbsContent) {
  return renderReExpr(
    hbsContent,
    /{{>\s?(?<partialname>[^ ]*)\s?}}/gi,
    function (_, partialname) {
      return partialsMap[partialname];
    }
  );
}

function executeHelpers(hbsContent, helperMap) {
  return renderReExpr(
    hbsContent,
    /{{#\s?(?<helpername>[^ ]*).*}}/,
    function (_, helpername) {
      const args = _.match(/'([^']*)'/g).map((a) => a.replace(/'/g, ""));
      return helperMap[helpername](...args);
    }
  );
}


module.exports = {
  renderVariables: renderVariables,
  renderPartials: renderPartials,
  executeHelpers: executeHelpers,
};
