import fs from "fs";
import FileService from "../services/FileService.js";
import path from "path";
import { uid } from "uid";

const dataPath = path.resolve(path.resolve(), "data/rows.json");

const fileService = new FileService();

class RowController {
  getRows(req, res) {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      res.send(JSON.parse(data));
    });
  }

  updateRow(req, res) {
    fileService.readFile(
      (data) => {
        let id = req.params["id"];
        if (!isNaN(id)) {
          id = Number(id);
        }
        const index = data.findIndex((row) => row["taskID"] === id);
        data[index] = req.body;
        fileService.writeFile(
          JSON.stringify(data, null, 2),
          () => {
            res.status(200).send({
              success: true,
              msg: "Row has been successfully updated",
            });
          },
          dataPath
        );
      },
      true,
      dataPath
    );
  }

  deleteRow(req, res) {
    fileService.readFile(
      (data) => {
        const ids = req.body.ids;
        ids.forEach((id) => {
          if (!isNaN(id)) {
            id = Number(id);
          }
          data = data.filter((row) => row["taskID"] !== id);
        });

        fileService.writeFile(
          JSON.stringify(data, null, 2),
          () => {
            res.status(200).send({
              success: true,
              msg: "Rows successfully deleted",
            });
          },
          dataPath
        );
      },
      true,
      dataPath
    );
  }

  createRow(req, res) {
    fileService.readFile(
      (data) => {
        const row = req.body.row;
        const position = req.body.position;
        const newRec = {
          taskID: uid(16),
          parentIndex: row.parentIndex,
          isParent: row.isParent,
        };

        data.splice(position, 0, newRec);

        fileService.writeFile(
          JSON.stringify(data, null, 2),
          () => {
            res.status(201).send({
              id: newRec.taskID,
              success: true,
              msg: "Row successfully created",
            });
          },
          dataPath
        );
      },
      true,
      dataPath
    );
  }
}

export default new RowController();
