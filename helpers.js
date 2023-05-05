var fs = require("fs");
var showdown = require("showdown");
var config = require("./site.config");
var parser = require("./parser");

function renderArticles(partialTemplateName) {
  /**
   * This function will render all articles in the articles directory.
   */
  var converter = new showdown.Converter();
  let articles = "";
  for (const article of fs.readdirSync(config.articlesDirectory)) {
    const mdContents = fs
      .readFileSync(`${config.articlesDirectory}/${article}`)
      .toString();
    const htmlContents = converter.makeHtml(mdContents);
    const template = fs
      .readFileSync(`${config.partialsDirectory}/${partialTemplateName}.hbs`)
      .toString();
    articles += parser.renderVariables(template, { content: htmlContents });
  }
  return articles;
}

function redirect(title, url) {
  return `<!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      {{> global-head }}
      <script>
          window.location.href = "${url}";
      </script>
  </head>

  <body>
  </body>

  </html>`;
}

// all helpers should be exported here with the intended key
module.exports = { render_articles: renderArticles, redirect: redirect };
