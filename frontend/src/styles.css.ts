import { globalStyle, style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "row",
  gap: 30,
});

export const menu = style({
  maxWidth: 200,
  borderRadius: 3,
  padding: 5,
  backgroundColor: "#223143",
  height: "100vh",
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: 5,
});

export const buttons = style({
  borderRadius: 3,
  padding: 8,
  color: "#fff",
  flexDirection: "column",
  gap: 5,
  fontSize: 20,

  ":hover": {
    backgroundColor: "#0e2339",
  },
});

export const tableHead = style({
  padding: "1rem",
  color: "#fff",
  flexDirection: "column",
  gap: 5,
  fontSize: 20,
});

export const tableBody = style({
  padding: "1rem",
  color: "#fff",
  flexDirection: "column",
  gap: 5,
  fontSize: 16,
});
export const checkBox = style({
  width: 20,
  height: 20,
});

globalStyle("body", {
  backgroundColor: "#0E0E10",
  color: "#fff",
});
globalStyle("table", {
  borderCollapse: "collapse",
  width: "100%",
  borderRadius: 7,
  overflow: "hidden",

  backgroundColor: "#1E1D24",
});

globalStyle("th,td", {
  borderTop: "1px solid black",
  borderBottom: "1px solid black",
  padding: "10px",
  textAlign: "left",
});
