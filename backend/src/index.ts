import express from "express";
import dotenv from "dotenv";
import { createBuilder, success, initRpc } from "@cuple/server";
import { z } from "zod";
import { deleteRow, getTablesData, TableName } from "./modell";
import { Prisma } from "@prisma/client";
import { fail } from "assert";

dotenv.config();

const app = express();
const port = 3001;
const builder = createBuilder(app);

console.log(Prisma.dmmf.datamodel.models[1]);

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
      try {
        await deleteRow(data.body.tableName as TableName, data.body.id);
        return success({ message: "succes" });
      } catch (error) {
        fail("Deletion is not allowed");
      }
    }),
};
initRpc(app, {
  path: "/rpc",
  routes,
});

console.log("asd");
export type Routes = typeof routes;

app.listen(port, () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});
