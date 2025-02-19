import { useState } from "react";
import EditPage from "./EditPage";
import { buttons, container, menu } from "./styles.css";

export default function Layout() {
  const tables = [
    { name: "Users", path: "users" },
    { name: "Products", path: "products" },
    { name: "Categories", path: "categories" },
  ];
  const [nav, setNav] = useState(tables[0].path);

  return (
    <div className={container}>
      <div className={menu}>
        {tables.map((e, i) => (
          <div
            key={i}
            className={buttons}
            onClick={() => {
              setNav(e.path);
            }}
            style={{ backgroundColor: e.path == nav ? "#0e2339" : "#223143" }}
          >
            {e.name}
          </div>
        ))}
      </div>
      <EditPage nav={nav} />
    </div>
  );
}
