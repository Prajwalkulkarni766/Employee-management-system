export default function CheckBox({ labelName, options, field }) {
  return (
    <div className="mb-3">
      <label className="form-label">{labelName}</label>
      {options.map((option, index) => (
        <div key={index} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id={`${labelName}-${index}`}
            {...field}
            value={option}
            checked={field.value.includes(option)}
          />
          <label className="form-check-label" htmlFor={`${labelName}-${index}`}>
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}
