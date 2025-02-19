import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaModels } from "prisma-models";

export type TableName = keyof Models;
type Models = PrismaModels<Prisma.ModelName, Prisma.TypeMap>;
type OneOfTableNames = "categories";

const prisma = new PrismaClient();

export async function getTablesData(tableName: TableName) {
  return await prisma[tableName as OneOfTableNames].findMany();
}
