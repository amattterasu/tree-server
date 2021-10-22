import Router from "express";
import ColumnController from "../controllers/ColumnControllers.js";

const router = new Router();

import cors from "cors";
import RowController from "../controllers/RowController.js";

router.get("/", (req, res) => {
  res.send("Tree Grid Express");
});

router.use(cors());
router.get("/columns", ColumnController.getColumns);
router.post("/columns", ColumnController.createCol);
router.put("/columns/:id", ColumnController.updateCol);
router.delete("/columns/:id", ColumnController.deleteCol);

router.get("/rows", RowController.getRows);
router.put("/rows/:id", RowController.updateRow);
router.post("/rows", RowController.deleteRow);

export default router;
