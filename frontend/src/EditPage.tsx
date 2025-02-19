import { useEffect, useState } from "react";
import { tableBody, tableHead, checkBox } from "./styles.css";

type Content = {
  id: number;
  string: string | number | boolean;
};
export default function EditPage(props: Record<string, string>) {
  const [content, setContent] = useState<Content[]>([]);
  const [isChecked, setIsChecked] = useState<number[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://localhost:3000/api/admin/${props.nav}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((e) => setContent(e));
    };
    fetchData();
  }, [props.nav]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={() => {
                  isChecked.length == content.length
                    ? setIsChecked([])
                    : setIsChecked(content.map((e) => e.id));
                }}
                className={checkBox}
              ></input>
            </th>
            {content.length > 0 ? (
              Object.keys(content[0]).map((e, i) => (
                <th className={tableHead} key={i}>
                  {e}
                </th>
              ))
            ) : (
              <th></th>
            )}
          </tr>
        </thead>
        <tbody className={tableBody}>
          {content.map((e, i) => (
            <tr key={i}>
              <td key={i}>
                <input
                  type="checkbox"
                  className={checkBox}
                  checked={isChecked.includes(e.id) ? true : false}
                  onChange={() => {
                    if (typeof e.id === "number") {
                      setIsChecked((prev) => [...prev, e.id]);
                    }
                  }}
                ></input>
              </td>
              {Object.entries(e).map(([j, k]) => (
                <td key={j}> {k}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
