var fileSystem = require("fs-extra"),
    path = require("path");

// clean de dist folder
fileSystem.emptyDirSync(path.join(__dirname, "../build"));
// fileSystem.copySync(path.join(__dirname, "./background.js"), path.join(__dirname, "../build"));
fileSystem.copySync(
  path.join(__dirname, "../src/js/background.js"),
  path.join(__dirname, "../build/background.js")
);

fileSystem.copySync(path.join(__dirname, "../src/images"), path.join(__dirname, "../build/images") );


require("./generate_manifest");
