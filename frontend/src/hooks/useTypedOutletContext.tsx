import { useOutletContext } from "react-router";
type Context =
  | {
      tableName: string;
      columnName?: string;
      foreignColumnName?: string;
    }
  | undefined;

type ContextKey = {
  foreignKeys: Context[];
};

export default function useTypedOutletContext(): Context | undefined {
  const context: ContextKey = useOutletContext();
  return context.foreignKeys != undefined ? context.foreignKeys[0] : undefined;
}
