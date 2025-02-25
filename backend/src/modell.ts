import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaModels } from "prisma-models";

export type TableName = keyof Models;
type Models = PrismaModels<Prisma.ModelName, Prisma.TypeMap>;
type OneOfTableNames = "categories";
export type Row = Record<string, string | boolean | number> & { id: number };

const prisma = new PrismaClient();

export async function getTablesData(tableName: TableName): Promise<Row[]> {
  return await prisma[tableName as OneOfTableNames].findMany();
}
export async function deleteRow(
  tableName: TableName,
  ids: number[],
): Promise<true | false> {
  try {
    await prisma[tableName as OneOfTableNames].deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return true;
  } catch (error) {
    console.error("Hiba a deleteRow-ban:", error);
    return false;
  }
}
