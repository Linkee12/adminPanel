import express from "express";
import dotenv from "dotenv";
import { createBuilder, success, initRpc } from "@cuple/server";
import { z } from "zod";
import { deleteRow, getTablesData, TableName } from "./modell";

dotenv.config();

const app = express();
const port = 3001;
const builder = createBuilder(app);

const routes = {
  list: builder
    .querySchema(
      z.object({
        tableName: z.string(),
      }),
    )
    .get(async ({ data }) => {
      const rows = await getTablesData(data.query.tableName as TableName);
      return success({
        rows,
      });
    }),
  delete: builder
    .bodySchema(z.object({ tableName: z.string(), id: z.array(z.number()) }))
    .post(async ({ data }) => {
      const res = await deleteRow(data.body.tableName as TableName, data.body.id);
      return success({ res });
    }),
};

initRpc(app, {
  path: "/rpc",
  routes,
});

export type Routes = typeof routes;

app.listen(port, () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});
