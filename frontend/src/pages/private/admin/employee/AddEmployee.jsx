import PageHeading from "../../../../components/PageHeading";
import EmployeeForm from "../../../../forms/EmployeeForm";

export default function AllEmployee() {
  return (
    <>
      <PageHeading pageName="Add Employee" />
      <EmployeeForm statusOfIsEditing={false} />
    </>
  );
}
