import express from "express";
import dotenv from "dotenv";
import { getTablesData, TableName } from "./modell";

dotenv.config();

const app = express();
const port = 3001;

app.get("/admin/:tableName", async (req, res) => {
  const alma = await getTablesData(req.params.tableName as TableName);
  res.send(JSON.stringify(alma));
});

app.listen(port, () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});
