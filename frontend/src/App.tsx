/* eslint-disable sonarjs/no-duplicate-string */
import { Route, Routes } from "react-router";
import Layout from "./Layout";
import { globalCss } from "@stitches/react";
import ListPage from "./ListPage";
export const ROUTES = {
  list: (tableName: string) => `/${tableName}`,
  create: (tableName: string) => `/${tableName}/create`,
  edit: (tableName: string, id: number | string) => `/${tableName}/edit/${id}`,
};

function App() {
  globalStyles();
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/"></Route>
        <Route path={ROUTES.list(":tableName")} element={<ListPage />}></Route>
        <Route path={ROUTES.create(":tableName")}></Route>
        <Route path={ROUTES.edit(":tableName", ":id")}></Route>
      </Route>
    </Routes>
  );
}
export default App;

const globalStyles = globalCss({
  body: {
    backgroundColor: "#0E0E10",
    color: "#fff",
  },
});
