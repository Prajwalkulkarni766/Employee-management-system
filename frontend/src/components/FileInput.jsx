export default function FileInput({ labelName, accept, id }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {labelName}
      </label>
      <input className="form-control" type="file" accept={accept} id={id} />
    </div>
  );
}
