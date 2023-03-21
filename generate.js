var fs = require("fs");
var config = require("./site.config");
var parser = require("./parser");
var helpers = require("./helpers");

if (!fs.existsSync(config.buildDirectory)) {
  fs.mkdirSync(config.buildDirectory);
}

function buildHTML(filename, hbsContent) {
  hbsContent = parser.renderPartials(hbsContent);
  hbsContent = parser.executeHelpers(hbsContent, helpers);
  hbsContent = parser.renderVariables(hbsContent, {slug: filename});

  return hbsContent;
}

// build all views
for (const viewFn of fs.readdirSync(config.viewsDirectory)) {
  if (!viewFn.endsWith(`.${config.extension}`)) {
    continue;
  }
  const fileContents = fs
    .readFileSync(`${config.viewsDirectory}/${viewFn}`)
    .toString();
  const viewName = viewFn.slice(0, -4);
  fs.writeFileSync(
    `${config.buildDirectory}/${viewName}.html`,
    buildHTML(viewName, fileContents)
  );
}

const assetURIs = ["css", "img", "js"].flatMap((subdir) => {
  const parentDir = `${config.staticDirectory}/${subdir}/`;
  return fs.existsSync(parentDir)
    ? fs.readdirSync(parentDir).map((fp) => `${parentDir}${fp}`)
    : [];
});

// copy all assets
for (const assetFp of assetURIs) {
  const oldAssetFp = assetFp.split("/").splice(-2).join("/");
  const newAssetFp = `${config.buildDirectory}/${oldAssetFp}`;

  // create directory if it doesn't exist
  fs.mkdirSync(newAssetFp.split("/").slice(0, -1).join("/"), {
    recursive: true,
  });

  fs.writeFileSync(newAssetFp, fs.readFileSync(assetFp));
}
