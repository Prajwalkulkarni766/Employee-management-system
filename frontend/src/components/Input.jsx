import TextField from "@mui/material/TextField";

export default function Input({
  labelName,
  inputType,
  inputId,
  onChange,
  value,
  errors,
  isTouched,
}) {
  return (
    <div>
      <TextField
        name={inputId}
        type={inputType}
        id={inputId}
        label={labelName}
        variant="outlined"
        value={value}
        onChange={onChange}
        fullWidth
      />

      {isTouched && errors ? <p className="error-text">{errors}</p> : <p></p>}
    </div>
  );
}
