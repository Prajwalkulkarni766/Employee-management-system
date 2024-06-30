import PageHeading from "../../../components/PageHeading";
import AddHolidayForm from "../../../forms/AddHolidayForm";

export default function AddHoliday() {
  return (
    <>
      <PageHeading pageName="Add Holiday" />
      <AddHolidayForm statusOfIsEditing={false} />
    </>
  );
}
