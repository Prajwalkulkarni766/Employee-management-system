export default function RadioInput({ labelName, options, field }) {
  return (
    <div className="mb-3">
      <label htmlFor={labelName} className="form-label">
        {labelName}
      </label>

      {options.map((option, index) => (
        <div key={index} className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id={`${labelName}-${index}`}
            {...field}
            value={option}
            checked={field.value === option}
          />
          <label className="form-check-label" htmlFor={`${labelName}-${index}`}>
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}
