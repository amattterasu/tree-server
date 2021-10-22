import fs from "fs";
import FileService from "../services/FileService.js";
import path from "path";
import { uid } from "uid";

const dataPath = path.resolve(path.resolve(), "data/columns.json");

const fileService = new FileService();

class ColumnController {
  getColumns(req, res) {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      res.send(JSON.parse(data));
    });
  }

  createCol(req, res) {
    fileService.readFile((data) => {
      const col = req.body;
      col["field"] = uid();
      data.push(col);
      fileService.writeFile(JSON.stringify(data, null, 2), () => {
        res.status(201).send({
          id: col["field"],
          success: true,
          msg: "New column added successfully",
        });
      });
    }, true);
  }

  updateCol(req, res) {
    fileService.readFile((data) => {
      const id = req.params["id"];
      const index = data.findIndex((col) => col["field"] === id);
      data[index] = req.body;
      fileService.writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send({
          success: true,
          msg: `Col id:${id} updated`,
        });
      });
    }, true);
  }

  deleteCol(req, res) {
    fileService.readFile((data) => {
      const id = req.params["id"];
      const filterData = data.filter((col) => col["field"] !== id);
      fileService.writeFile(JSON.stringify(filterData, null, 2), () => {
        res.status(200).send({
          success: true,
          msg: `Col id:${id} removed`,
        });
      });
    }, true);
  }
}

export default new ColumnController();
