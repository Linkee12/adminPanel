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
  }, []);

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
          console.log(row);
        }}
      >
        Save
      </SaveBtn>
    </Container>
  );
}
