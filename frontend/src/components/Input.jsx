export default function Input({
  labelName,
  inputType,
  inputId,
  placeholder,
  onChange,
  value,
}) {
  return (
    <div className="mb-3">
      <label htmlFor={inputId} className="form-label">
        {labelName}
      </label>
      <input
        type={inputType}
        className="form-control"
        id={inputId}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required
      />
    </div>
  );
}
