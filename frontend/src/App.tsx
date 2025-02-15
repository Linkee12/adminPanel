import { Route, Routes } from "react-router";
import Layout from "./Layout";
import EditPage from "./EditPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<EditPage />} />
      </Route>
    </Routes>
  );
}
export default App;
