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
  color: "grey",
  flexDirection: "column",
  gap: 5,
  fontSize: 20,

  ":hover": {
    backgroundColor: "#0e2339",
  },
});

globalStyle("body", {
  backgroundColor: "#0E0E10",
  color: "#fff",
});
