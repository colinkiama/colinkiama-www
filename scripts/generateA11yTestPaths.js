const fs = require('fs');
const path = require('path');
const VALIDITY_TEST_FILE_NAME = "testPaths.txt";
const PA11Y_FILE_NAME = ".pa11yci";
const PUBLIC_DIRECTORY_NAME = "public";

const testURL = "http://localhost:1111";

let htmlPaths = [];

function writeToFile(parsedFilePath, parsedFileName, parsedContent) {
  fs.mkdir(parsedFilePath, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
    const writePath = `${parsedFilePath}/${parsedFileName}`;
    fs.writeFile(writePath, parsedContent, { flag: "w" }, () => {
      console.log("Generated content in:", writePath)
    });
  });
};


function findHtmlFiles(startPath) {
  if (!fs.existsSync(startPath)) {
    console.error("no dir ", startPath);
    return;
  }
  
  var files = fs.readdirSync(startPath);
  
  // Creating string and getting length of it only once for reuse in loop.
  const publicDirectorySliceString = `${PUBLIC_DIRECTORY_NAME}/`;
  const sliceStartStringLength = publicDirectorySliceString.length;

  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    
    if (stat.isDirectory()) {
      findHtmlFiles(filename);
    } else if (filename.indexOf('.html') >= 0) {
      let sliceStartIndex = filename.indexOf(publicDirectorySliceString) + sliceStartStringLength;
      const filePathSlice = filename.slice(sliceStartIndex, filename.length);
      htmlPaths.push(`${testURL}/${filePathSlice}`);
      console.log(htmlPaths);
    };
  };
};

function generateTestPathsFileContent() {
  let testPathsFileContent = "";
  htmlPaths.forEach((htmlPath, index) => {
    if (index > 0) {
      testPathsFileContent += "\n";
    }
    testPathsFileContent += htmlPath;
  });

  return testPathsFileContent;

}

findHtmlFiles(path.resolve(`./${PUBLIC_DIRECTORY_NAME}`));

// Create a string that is a list of paths, each seperated by a new line.
const content = generateTestPathsFileContent();

writeToFile(".", VALIDITY_TEST_FILE_NAME, content);

const pa11yConfig = {
  "defaults": {
    "standard": "WCAG2AAA"
  },
  "urls": htmlPaths
};

console.log(htmlPaths);

const pa11yConfigContent = JSON.stringify(pa11yConfig);

writeToFile(".", PA11Y_FILE_NAME, pa11yConfigContent);