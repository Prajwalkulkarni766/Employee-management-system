import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function MySelect({ labelName, options }) {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id={`${labelName}`}>{labelName}</InputLabel>
      <Select
        labelId={`${labelName}`}
        value={value}
        label={`${labelName}`}
        onChange={handleChange}
        fullWidth
      >
        {options.map((option) => (
          <MenuItem value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
