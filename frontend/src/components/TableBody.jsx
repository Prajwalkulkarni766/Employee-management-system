export default function TableBody({ rows }) {
  return (
    <tbody>
      <tr>
        {rows.map((value, index) => (
          <td key={index}>{value}</td>
        ))}
      </tr>
    </tbody>
  );
}
