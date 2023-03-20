var fs = require("fs");
var showdown = require("showdown");
var config = require("./site.config");
var parser = require("./parser");

function renderArticles(partialTemplateName) {
  var converter = new showdown.Converter();
  let articles = "";
  for (const article of fs.readdirSync(config.articlesDirectory)) {
    const mdContents = fs.readFileSync(`${config.articlesDirectory}/${article}`).toString();
    const htmlContents = converter.makeHtml(mdContents);
    const template = fs.readFileSync(
      `${config.partialsDirectory}/${partialTemplateName}.hbs`
    ).toString();
    articles += parser.renderVariables(template, { content: htmlContents });
  }
  return articles;
}

// all helpers should be exported here with the intended key
module.exports = { render_articles: renderArticles };
