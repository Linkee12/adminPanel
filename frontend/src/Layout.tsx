import { styled } from "@stitches/react";
import { Outlet, useNavigate, useParams } from "react-router";
import { ROUTES } from "./App";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

export default function Layout() {
  const tables = [
    { name: "Users", path: "users" },
    { name: "Products", path: "products" },
    { name: "Categories", path: "categories" },
  ];
  const navigate = useNavigate();
  const { tableName } = useParams();
  return (
    <Container>
      <Menu>
        {tables.map((table) => (
          <MenuButton
            key={table.path}
            onClick={() => navigate(ROUTES.list(table.path))}
            active={table.path === tableName}
          >
            {table.name}
          </MenuButton>
        ))}
      </Menu>
      <Content>
        <Header id="header"></Header>
        <Outlet />
      </Content>
    </Container>
  );
}

export function HeaderPortal(props: { children: ReactNode }) {
  const headerElement = document.getElementById("header");
  if (!headerElement) return;
  return createPortal(props.children, headerElement);
}

const Container = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: 30,
});
const Header = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: 30,
});

const Content = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 30,
  flex: 1,
  padding: "1rem",
});

const Menu = styled("div", {
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

const MenuButton = styled("div", {
  cursor: "pointer",
  borderRadius: 3,
  padding: 8,
  color: "#fff",
  flexDirection: "column",
  gap: 5,
  fontSize: 20,
  "&:hover": {
    backgroundColor: "#0e2339",
  },
  variants: {
    active: {
      true: {
        background: "#0e2339",
      },
      false: {
        background: "#223143",
      },
    },
  },
});
