/* eslint-disable sonarjs/no-duplicate-string */
import { Route, Routes } from "react-router";
import Layout from "./Layout";
import { globalCss } from "@stitches/react";
import ListPage from "./ListPage";
import EditPage from "./EditPage";
import CreatePage from "./CreatePage";
import ResourceLayout from "./ResourceLayout";
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
        <Route element={<ResourceLayout />}>
          <Route path="/"></Route>
          <Route path={ROUTES.list(":tableName")} element={<ListPage />}></Route>
          <Route path={ROUTES.create(":tableName")} element={<CreatePage />}></Route>
          <Route path={ROUTES.edit(":tableName", ":id")} element={<EditPage />}></Route>
        </Route>
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
