import { useParams } from "react-router";
import { Row } from "../../backend/src/model";
import { Container, InputContainer, Name, SaveBtn } from "./EditPage";
import { client } from "./cuple";
import { useEffect, useState } from "react";
import useTypedOutletContext from "./hooks/useTypedOutletContext";
import getInput from "./getInput";

export default function CreatePage() {
  const { tableName } = useParams();
  const [row, setRow] = useState<Row>();
  const [relations, setRelations] = useState<Row[]>([]);
  const context = useTypedOutletContext();

  useEffect(() => {
    fetchData();
  }, [tableName]);

  const columnName = context?.columnName ? context?.columnName : "";

  useEffect(() => {
    if (context?.columnName === undefined || row === undefined) return;
    if (columnName in row) {
      getRelation(context.tableName);
    }
  }, [row]);

  async function fetchData() {
    if (!tableName) return;
    const response = await client.getFirstRow.get({
      query: { tableName },
    });
    if (response.result !== "success") return;
    const entries = Object.entries(response.row as Row).map(([key, value]) => [
      [key],
      initValue(value),
    ]);
    setRow(Object.fromEntries(entries));
  }
  async function getRelation(tableName: string) {
    const response = await client.list.get({
      query: { tableName },
    });
    if (response.result !== "success") return;
    setRelations(response.rows);
  }
  function initValue(value: unknown) {
    if (isValidDate(value as string)) {
      return new Date(Date.now()).toISOString();
    }
    switch (typeof value) {
      case "string":
        return "";
      case "number":
        return 0;
      case "boolean":
        return false;
      default:
        break;
    }
  }

  async function saveChanges(row: Row) {
    if (tableName != undefined) {
      const response = await client.add.post({
        body: { ...{ tableName }, data: row },
      });
      if (response.result !== "success") return;
    }
  }

  function isValidDate(dateString: string) {
    const pattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;
    return pattern.test(dateString);
  }
  return (
    <Container>
      {row ? (
        Object.entries(row).map(([key, value], i) => (
          <InputContainer key={i}>
            <Name>{key}</Name>
            {key === "id" ? (
              <></>
            ) : (
              getInput(value, key, row, setRow, columnName, relations)
            )}
          </InputContainer>
        ))
      ) : (
        <Name>Nincs adat</Name>
      )}
      <SaveBtn
        onClick={() => {
          if (row) {
            saveChanges(row);
          }
        }}
      >
        Save
      </SaveBtn>
    </Container>
  );
}
