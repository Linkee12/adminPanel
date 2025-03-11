import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaModels } from "prisma-models";

export type TableName = keyof Models;
type Models = PrismaModels<Prisma.ModelName, Prisma.TypeMap>;
type OneOfTableNames = "categories";
export type Row = Record<string, string | boolean | number> & { id: number };
type RowWithoutId = Record<string, string | boolean | number>;

const prisma = new PrismaClient({
  datasourceUrl: process.env["BACKEND_DATABASE_URL"] || "",
});

export async function getTablesData(tableName: TableName): Promise<Row[]> {
  return await prisma[tableName as OneOfTableNames].findMany();
}

export async function getFirstRow(tableName: TableName): Promise<Row | undefined> {
  const result = await prisma[tableName as OneOfTableNames].findFirst();
  return result ? result : undefined;
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

export type GetForeignKeysResult = {
  tableName: string;
  columnName: string;
  foreignColumnName: string;
};

export async function getForeignKeys(
  tableName: TableName,
): Promise<GetForeignKeysResult[]> {
  const model = Prisma.dmmf.datamodel.models.find((object) => object.name === tableName);
  if (!model) {
    throw new Error();
  }
  return model.fields
    .filter((field) => field.relationFromFields)
    .map((e) => ({
      tableName: e.type,
      columnName: e.relationFromFields ? e.relationFromFields[0]! : "",
      foreignColumnName: e.relationToFields ? e.relationToFields[0]! : "",
    }));
}

export async function updatedRow(tableName: TableName, updatedRow: Row) {
  try {
    await prisma[tableName as OneOfTableNames].update({
      where: {
        id: updatedRow.id,
      },
      data: updatedRow,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function addRow(tableName: string, newRow: RowWithoutId) {
  delete newRow["id"];
  console.log(newRow);
  if (prisma != undefined) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (prisma as any)[tableName].create({
      data: newRow,
    });
  }
}
