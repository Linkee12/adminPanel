import { useLocation, useParams } from "react-router";
import type { Row } from "../../backend/src/model";
import { useEffect, useState } from "react";
import { styled } from "@stitches/react";
import useTypedOutletContext from "./hooks/useTypedOutletContext";
import { client } from "./cuple";
import getInput from "./getInput";

export default function EditPage() {
  const [row, setRow] = useState<Row>(useLocation().state);
  const [relations, setRelations] = useState<Row[]>([]);
  const context = useTypedOutletContext();
  const { tableName } = useParams();

  useEffect(() => {
    if (context?.columnName === undefined) return;
    if (context?.columnName in row) {
      getRelation(context.tableName);
    }
  }, [row]);

  async function getRelation(tableName: string) {
    const response = await client.list.get({
      query: { tableName },
    });
    if (response.result !== "success") return;
    setRelations(response.rows);
  }
  const columnName = context?.columnName ? context?.columnName : "";

  async function saveChanges(row: Row) {
    if (tableName != undefined) {
      const response = await client.edit.put({
        body: { ...{ tableName }, data: row },
      });
      if (response.result !== "success") return;
    }
  }

  return (
    <Container>
      {Object.entries(row).map(([key, value], i) => (
        <InputContainer key={i}>
          <Name>{key}</Name>
          {key === "id" ? (
            <Name>{value as number}</Name>
          ) : (
            getInput(value, key, row, setRow, columnName, relations)
          )}
        </InputContainer>
      ))}
      <SaveBtn onClick={() => saveChanges(row)}>Save</SaveBtn>
    </Container>
  );
}

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
});
export const InputContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#1E1D24",
  height: "3rem",
  margin: 6,
  borderRadius: 5,
  padding: 5,
});

export const Name = styled("h2", {
  display: "flex",
  minWidth: "10rem",
  whiteSpace: "nowrap",
  alignItems: "center",
});

export const SaveBtn = styled("button", {
  width: "6rem",
  height: "3rem",
  fontSize: 24,
  fontWeight: 700,
  backgroundColor: "#223143",
  border: "none",
  borderRadius: 5,
  "&:hover": {
    backgroundColor: "#0e2339",
  },
  alignItems: "center",
  margin: 10,
});
