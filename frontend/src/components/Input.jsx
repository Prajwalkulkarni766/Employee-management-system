export default function Input({
  labelName,
  inputType,
  inputId,
  placeholder,
  onChange,
  onBlur,
  value,
  errors,
  isTouched,
}) {
  return (
    <div>
      <label htmlFor={inputId} className="form-label">
        {labelName}
      </label>
      <input
        name={inputId}
        type={inputType}
        className="form-control"
        id={inputId}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        required
      />

      {isTouched && errors ? (
        <p className="text-danger">{errors}</p>
      ) : (
        <p></p>
      )}
    </div>
  );
}
