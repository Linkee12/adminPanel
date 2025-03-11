import { styled } from "@stitches/react";
import type { Row } from "../../backend/src/model";

export default function getInput(
  value: unknown,
  key: string,
  row: Row,
  onChange: (row: Row) => void,
  columnName: string,
  relationArr: Row[],
) {
  function isValidDate(dateString: string) {
    const pattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;
    return pattern.test(dateString);
  }
  if (key == columnName) {
    return (
      <SelectInput
        value={value as string}
        relationArr={relationArr}
        onChange={(value) => onChange({ ...row, [key]: value })}
      />
    );
  }

  switch (typeof value) {
    case "string":
      return isValidDate(value) ? (
        <DateInput
          value={value}
          onChange={(value) => onChange({ ...row, [key]: value })}
        />
      ) : (
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange({ ...row, [key]: e.target.value })}
        />
      );
    case "number":
      return (
        <NumberInput
          value={value}
          onChange={(value) => onChange({ ...row, [key]: value })}
        />
      );
    case "boolean":
      return (
        <Input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange({ ...row, [key]: e.target.value })}
        />
      );

    default:
      break;
  }
}

type DateInputProps = {
  value: string;
  onChange: (value: string) => void;
};
function DateInput(props: DateInputProps) {
  return (
    <Input
      type="datetime-local"
      onChange={(e) => props.onChange(e.target.value)}
      value={props.value}
    />
  );
}

type NumberInputProps = {
  value: number;
  onChange: (value: number) => void;
};
function NumberInput(props: NumberInputProps) {
  return (
    <Input
      type="number"
      onChange={(e) => props.onChange(parseFloat(e.target.value))}
      value={props.value}
    />
  );
}

type SelectInputProps = {
  value: string;
  relationArr: Row[];
  onChange: (value: number) => void;
};

function SelectInput(props: SelectInputProps) {
  return (
    <select
      value={props.value}
      onChange={(e) => props.onChange(parseInt(e.target.value))}
    >
      {props.relationArr.map((row, index) => (
        <option value={row.id} key={index}>
          {row.name}
        </option>
      ))}
    </select>
  );
}

export const Input = styled("input", {
  fontSize: 18,
});
