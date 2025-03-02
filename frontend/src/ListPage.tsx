/* eslint-disable sonarjs/no-duplicate-string */
import { useEffect, useMemo, useState } from "react";
import { styled } from "@stitches/react";
import { useNavigate, useParams } from "react-router";
import { HeaderPortal } from "./Layout";
import { client } from "./cuple";
import type { Row } from "../../backend/src/modell";
import { MdDelete } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { ROUTES } from "./App";

export default function ListPage() {
  const { tableName } = useParams();
  const [rows, setRows] = useState<Row[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
  const [selectedField, setSelectedField] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const nav = useNavigate();

  useEffect(() => {
    fetchData();
    setSelectedRowIds([]);
  }, [tableName]);

  const filteredRows = useMemo(() => {
    if (!selectedField) return rows;
    return rows.filter(
      (row) =>
        row[selectedField].toString().toLowerCase().match(filter.toLowerCase()) !== null,
    );
  }, [filter, rows]);

  const isAllChecked = selectedRowIds.length == rows.length;
  const columnNames = Object.keys(rows?.[0] || {});

  async function fetchData() {
    if (!tableName) return;
    const response = await client.list.get({
      query: { tableName },
    });
    if (response.result !== "success") return;
    setRows(response.rows);
  }

  async function deleteRow(tableName: string, id: number[]) {
    const response = await client.delete.post({ body: { tableName, id } });

    console.log(response);
    if (response.result !== "success") return;
    fetchData();
  }

  return (
    <Container>
      <HeaderPortal>
        <SelectInput onChange={(e) => setSelectedField(e.target.value)}>
          <option value={""}>---</option>
          {columnNames.map((columnName) => (
            <option key={columnName} value={columnName}>
              {columnName}
            </option>
          ))}
        </SelectInput>
        <SearchInput
          type="text"
          placeholder="Search something..."
          onChange={(e) => setFilter(e.target.value)}
        ></SearchInput>
      </HeaderPortal>
      <Table>
        <thead>
          <tr>
            <th>
              <CheckBox
                type="checkbox"
                checked={isAllChecked}
                onChange={() => {
                  isAllChecked
                    ? setSelectedRowIds([])
                    : setSelectedRowIds(filteredRows.map((row) => row.id));
                }}
              />
            </th>
            {columnNames.map((columnName, idx) => (
              <th key={idx}>{columnName}</th>
            ))}
            <th>
              <MdEditSquare size={26} />
            </th>
            <th>
              <MdDeleteSweep size={26} />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row, idx) => (
            <tr key={idx}>
              <td key={idx}>
                <CheckBox
                  type="checkbox"
                  checked={selectedRowIds.includes(row.id) ? true : false}
                  onChange={() => {
                    selectedRowIds.includes(row.id)
                      ? setSelectedRowIds(selectedRowIds.filter((id) => id != row.id))
                      : setSelectedRowIds([...selectedRowIds, row.id]);
                  }}
                ></CheckBox>
              </td>
              {Object.entries(row).map(([columnName, columnValue]) => (
                <td key={columnName}> {columnValue}</td>
              ))}
              <td>
                <Icon
                  onClick={() => {
                    if (tableName) {
                      nav(ROUTES.edit(tableName, row.id), { state: row });
                    }
                  }}
                >
                  <RiEdit2Fill size={24} />
                </Icon>
              </td>
              <td>
                <Icon
                  onClick={() => {
                    if (tableName) {
                      deleteRow(tableName, [row.id]);
                    }
                  }}
                >
                  <MdDelete size={24} />
                </Icon>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

const CheckBox = styled("input", {
  width: 20,
  height: 20,
});
const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const Icon = styled("div", {
  "&:hover": {
    color: "red",
  },
});
const SearchInput = styled("input", {
  width: "100%",
  height: "3rem",
  fontSize: 24,
  border: "none",
  borderRadius: 4,
  paddingLeft: 6,
  backgroundColor: "grey",
  outline: "none",
});

const Table = styled("table", {
  borderCollapse: "collapse",
  width: "100%",
  borderRadius: 7,
  overflow: "hidden",
  backgroundColor: "#1E1D24",
  td: {
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    padding: "10px",
    textAlign: "left",
  },
  th: {
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    textAlign: "left",
    padding: "10px",
    color: "#fff",
    flexDirection: "column",
    gap: 5,
    fontSize: 20,
  },
  tbody: {
    padding: "1rem",
    color: "#fff",
    flexDirection: "column",
    gap: 5,
    fontSize: 16,
  },
});

const SelectInput = styled("select", {
  backgroundColor: "grey",
  border: "none",
  borderRadius: 3,
  fontSize: 24,
  fontWeight: 500,
  paddingLeft: 10,
});
