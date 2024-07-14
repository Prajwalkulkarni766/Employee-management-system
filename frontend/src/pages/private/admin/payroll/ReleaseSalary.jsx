import PageHeading from "../../../../components/PageHeading";
import ReleaseSalaryForm from "../../../../forms/ReleaseSalaryForm";

export default function ReleaseSalary() {
  return (
    <>
      <PageHeading pageName={"Release salary of particular employee"} />
      <ReleaseSalaryForm />
    </>
  );
}
