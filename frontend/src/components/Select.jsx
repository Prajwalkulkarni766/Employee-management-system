export default function Select({ labelName, options, field }) {
  return (
    <div className="mb-3">
      <label htmlFor={field.name} className="form-label">
        {labelName}
      </label>
      <select
        {...field}
        className="form-select"
        aria-label="Default select example"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
