import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3001;

app.get("/admin/:tableName", async (req, res) => {
  if (req) {
    console.log(req.params.tableName);
  }
  res.send("");
});

app.listen(port, () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});
