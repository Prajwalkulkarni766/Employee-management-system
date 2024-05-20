import TextField from "@mui/material/TextField";

export default function Input({
  labelName,
  inputType,
  inputId,
  onChange,
  onBlur,
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
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        required
      />

      {isTouched && errors ? <p className="error-text">{errors}</p> : <p></p>}
    </div>
  );
}
