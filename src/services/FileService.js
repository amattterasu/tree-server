import fs from "fs";
import path from "path";

const dataPath = path.resolve(path.resolve(), "data/columns.json");

class FileService {
  readFile(
    callback,
    returnJson = false,
    filePath = dataPath,
    encoding = "utf8"
  ) {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }
      callback(returnJson ? JSON.parse(data) : data);
    });
  }

  writeFile(fileData, callback, filePath = dataPath, encoding = "utf8") {
    fs.writeFile(filePath, fileData, encoding, (err) => {
      if (err) {
        throw err;
      }
      callback();
    });
  }
}

export default FileService;
