import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { client } from "./cuple";
import type { GetForeignKeysResult } from "../../backend/src/model";

export default function ResourceLayout() {
  const { tableName } = useParams();

  const [foreignKeys, setforeignKeys] = useState<GetForeignKeysResult[]>();

  useEffect(() => {
    if (!tableName) return;
    client.foreignKeys
      .get({ query: { tableName: tableName } })
      .then((data) => {
        // eslint-disable-next-line promise/always-return
        if (data.result === "success") {
          setforeignKeys(data.foreignKeys);
        }
      })
      .catch((error) => console.error(error));
  }, [tableName]);
  return <Outlet context={{ foreignKeys }} />;
}
