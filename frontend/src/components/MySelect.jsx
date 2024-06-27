import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function MySelect({
  labelName,
  options,
  isTouched,
  errors,
  value,
  onChange,
  onBlur,
}) {
  const name = labelName.toLowerCase();
  return (
    <FormControl fullWidth>
      <InputLabel id={`${labelName}`}>{labelName}</InputLabel>
      <Select
        labelId={`${labelName}`}
        value={value}
        label={`${labelName}`}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        fullWidth
      >
        {options.map((option) => (
          <MenuItem value={option}>{option}</MenuItem>
        ))}
      </Select>
      {isTouched && errors ? <p className="error-text">{errors}</p> : <p></p>}
    </FormControl>
  );
}
