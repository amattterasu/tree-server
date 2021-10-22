import express from "express";
import router from "./src/routes/routes.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT ?? 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(cors());

app.listen(PORT, () => {
  console.log(`App now running on port ${PORT}...`);
});
