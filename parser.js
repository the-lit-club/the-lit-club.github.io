/**
 * Parser for a tiny subset of the handlebars system.
 * All HBS files are generated into a static HTML page under the build directory.
 *
 * Supported syntax:
 *  {{var}}
 *  {{> partial }}
 *  {{#helper 'arg1' 'arg2'}}
 */

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

function renderPartials(hbsContent, partialMap) {
  return renderReExpr(
    hbsContent,
    /{{>\s?(?<partialname>[^ ]*)\s?}}/gi,
    function (_, partialname) {
      return partialMap[partialname];
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
