import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaModels } from "prisma-models";

export type TableName = keyof Models;
type Models = PrismaModels<Prisma.ModelName, Prisma.TypeMap>;
type OneOfTableNames = "categories";
export type Row = Record<string, string | boolean | number> & { id: number };

const prisma = new PrismaClient({
  datasourceUrl: process.env["BACKEND_DATABASE_URL"] || "",
});

export async function getTablesData(tableName: TableName): Promise<Row[]> {
  return await prisma[tableName as OneOfTableNames].findMany();
}
export async function deleteRow(tableName: TableName, ids: number[]) {
  try {
    await prisma[tableName as OneOfTableNames].deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
