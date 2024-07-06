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
}) {
  const name = labelName.toLowerCase().replace(/\s+/g, "-");
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-label`}>{labelName}</InputLabel>
      <Select
        labelId={`${name}-label`}
        value={value}
        onChange={onChange}
        name={name}
        label={labelName}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        fullWidth
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={`${option}`}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {isTouched && errors ? <p className="error-text">{errors}</p> : <p></p>}
    </FormControl>
  );
}
