import express from "express";
import dotenv from "dotenv";
import { createBuilder, success, initRpc } from "@cuple/server";
import { z } from "zod";
import {
  deleteRow,
  getFirstRow,
  getForeignKeys,
  getTablesData,
  TableName,
  updatedRow,
} from "./model";
import { fail } from "assert";

dotenv.config();

const app = express();
const port = 3001;
const builder = createBuilder(app);

const RowSchema = z.object({
  tableName: z.string(),
  data: z
    .object({
      id: z.number(),
    })
    .catchall(z.union([z.string(), z.number(), z.boolean()])),
});

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

  getFirstRow: builder
    .querySchema(
      z.object({
        tableName: z.string(),
      }),
    )
    .get(async ({ data }) => {
      const row = await getFirstRow(data.query.tableName as TableName);
      return success({
        row,
      });
    }),

  delete: builder
    .querySchema(z.object({ tableName: z.string(), id: z.array(z.coerce.number()) }))
    .delete(async ({ data }) => {
      try {
        await deleteRow(data.query.tableName as TableName, data.query.id);
        return success({ message: "succes" });
      } catch (error) {
        fail("Deletion is not allowed");
      }
    }),

  edit: builder.bodySchema(RowSchema).put(async ({ data }) => {
    try {
      await updatedRow(data.body.tableName as TableName, data.body.data);
      return success({ message: "succes" });
    } catch (error) {
      fail("The edit was failed");
    }
  }),
  /*
  add: builder.bodySchema(RowSchema).post(async ({ data }) => {
    try {
      await addRow(data.body.tableName as TableName, data.body);
      return success({ message: "succes" });
    } catch (error) {
      fail("The edit was failed");
    }
  }),*/
  foreignKeys: builder
    .querySchema(z.object({ tableName: z.string() }))
    .get(async ({ data }) => {
      try {
        const foreignKeys = await getForeignKeys(data.query.tableName as TableName);
        return success({ foreignKeys });
      } catch (error) {
        fail("Table does not exist");
      }
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
