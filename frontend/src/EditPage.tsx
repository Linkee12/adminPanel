import { useLocation } from "react-router";
import { Row } from "../../backend/src/modell";
import { useState } from "react";
import { styled } from "@stitches/react";

export default function EditPage() {
  const [row, setRow] = useState<Row>(useLocation().state);

  function isValidDate(dateString: string) {
    const pattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.d{3}Z/;
    return pattern.test(dateString);
  }

  return (
    <Container>
      {Object.entries(row).map(([key, value], i) => (
        <InputContainer key={i}>
          <Name>{key}</Name>
          {key === "id" ? (
            <Name>{value as number}</Name>
          ) : isValidDate(value as string) ? (
            <Input
              key={i}
              type={"date"}
              value={typeof row[key] != "boolean" ? row[key] : ""}
              onChange={(e) => setRow({ ...row, [key]: e.target.value })}
            ></Input>
          ) : typeof value === "number" ? (
            <Input
              type="number"
              value={row[key] as number}
              onChange={(e) => setRow({ ...row, [key]: e.target.value })}
            ></Input>
          ) : typeof value === "boolean" ? (
            <Input type="checkbox" checked={row[key] as boolean}></Input>
          ) : (
            <Input
              type="text"
              value={row[key] as string}
              onChange={(e) => setRow({ ...row, [key]: e.target.value })}
            ></Input>
          )}
        </InputContainer>
      ))}
      <SaveBtn>Save</SaveBtn>
    </Container>
  );
}
const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
});
const InputContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#1E1D24",
  height: "3rem",
  margin: 6,
  borderRadius: 5,
  padding: 5,
});

const Name = styled("h2", {
  display: "flex",
  minWidth: "10rem",
  whiteSpace: "nowrap",
  alignItems: "center",
});
const Input = styled("input", {
  fontSize: 18,
});
const SaveBtn = styled("button", {
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
