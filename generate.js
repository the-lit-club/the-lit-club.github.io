/**
 * Supports a tiny part of the handlebars syntax. All HBS files are generated
 * into static HTML files under the build directory.
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

function renderPartials(hbsContent) {
  Object.keys(partialsMap).forEach(
    (varname) =>
      (hbsContent = hbsContent.replace(
        new RegExp(`{{> ${varname} }}`, "gi"),
        partialsMap[varname]
      ))
  );
  return hbsContent;
}

function buildHTML(hbsContent) {
  hbsContent = renderPartials(hbsContent);

  return hbsContent;
}

if (!fs.existsSync(config.buildDirectory)) {
  fs.mkdirSync(config.buildDirectory);
}

// generate static HTML files
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
    buildHTML(fileContents)
  );
}

const assetURIs = ["css", "img", "js"].flatMap((subdir) => {
  const parentDir = `${config.staticDirectory}/${subdir}/`;
  return fs.existsSync(parentDir)
    ? fs.readdirSync(parentDir).map((fp) => `${parentDir}${fp}`)
    : [];
});

// copy public assets
for (const assetFp of assetURIs) {
  const oldAssetFp = assetFp.split("/").splice(-2).join("/");
  const newAssetFp = `${config.buildDirectory}/${oldAssetFp}`;

  // make all the required directories for the asset fp
  fs.mkdirSync(newAssetFp.split("/").slice(0, -1).join("/"), {
    recursive: true,
  });

  fs.writeFileSync(newAssetFp, fs.readFileSync(assetFp));
}
