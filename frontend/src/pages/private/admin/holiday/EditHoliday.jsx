import PageHeading from "../../../../components/PageHeading";
import AddHolidayForm from "../../../../forms/AddHolidayForm"

export default function EditHoliday() {
  return (
    <>
      <PageHeading pageName="Edit Holiday" />
      <AddHolidayForm statusOfIsEditing={true} />
    </>
  );
}
