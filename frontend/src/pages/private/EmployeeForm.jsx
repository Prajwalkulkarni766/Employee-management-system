import { useFormik } from "formik";
import Input from "../../components/Input";
import Select from "../../components/Select";
import RadioInput from "../../components/RadioInput";
import CheckBox from "../../components/CheckBox";
import FileInput from "../../components/FileInput";
import Button from "../../components/Button";

export default function EmployeeForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobileNumber: 12345,
      designation: "HR",
      gender: "Male",
      courses: [],
      profileImage: null,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <div className="container mt-5">
        <form onSubmit={formik.handleSubmit}>
          <Input
            labelName="Name"
            inputType="text"
            inputId="name"
            placeholder="Enter name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />

          <Input
            labelName="Email address"
            inputType="email"
            inputId="email"
            placeholder="Enter email address"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <Input
            labelName="Mobile number"
            inputType="text"
            inputId="mobile_number"
            placeholder="Enter mobile number"
            onChange={formik.handleChange}
            value={formik.values.mobileNumber}
          />

          <Select
            labelName="Designation"
            options={["HR", "Manager", "Sales"]}
            field={formik.getFieldProps("designation")}
          />

          <RadioInput
            labelName="Gender"
            options={["Male", "Female"]}
            field={formik.getFieldProps("gender")}
          />

          <CheckBox
            labelName="Course"
            options={["MCA", "BCA", "BSC"]}
            field={formik.getFieldProps("courses")}
          />

          <FileInput
            labelName="Select the profile image"
            accept="image/png, image/jpeg"
            id="profileImage"
          />

          <Button labelName="Create" />
        </form>
      </div>
    </>
  );
}
