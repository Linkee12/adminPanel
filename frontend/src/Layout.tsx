import { buttons, container, menu } from "./styles.css";
import { Outlet, useNavigate } from "react-router";

export default function Layout() {
  const tables = [
    { name: "Users", path: "users" },
    { name: "Products", path: "products" },
    { name: "Categories", path: "categories" },
  ];
  const nav = useNavigate();

  return (
    <div className={container}>
      <div className={menu}>
        {tables.map((e, i) => (
          <div
            key={i}
            className={buttons}
            onClick={() => {
              nav("/");
            }}
          >
            {e.name}
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
