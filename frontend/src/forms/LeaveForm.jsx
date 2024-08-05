import { useFormik } from "formik";
import * as Yup from "yup";
import Paper from "@mui/material/Paper";
import Toast from "../helper/Toast";
import Input from "../components/Input";
import axiosInstance from "../axios/axiosInstance";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import MySelect from "../components/MySelect";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


export default function LeaveForm({ statusOfIsEditing }) {

    const leaveSchema = Yup.object({
        leavetype: Yup.string().required("Leave Type is required"),
        leaveReason: Yup.string().required("Leave Reason is required"),
        leaveStartDate: Yup.date().required("Leave Start Date Required"),
        leaveEndDate: Yup.date().required("Leave End Date Required"),
    });

    const formik = useFormik({
        initialValues: {
            leavetype: "",
            leaveReason: "",
            leaveStartDate: dayjs(),
            leaveEndDate: dayjs().add(1, 'day')
        },
        validationSchema: leaveSchema,
        onSubmit: async (values) => {
            try {
                values.leaveType = values.leavetype
                values.leaveStartDate = dayjs(values.leaveStartDate).format("YYYY-MM-DD")
                values.leaveEndDate = dayjs(values.leaveEndDate).format("YYYY-MM-DD")
                const response = statusOfIsEditing
                    ? await axiosInstance.patch("/v1/holiday", values)
                    : await axiosInstance.post("/v1/leave", values);

                if (response.status === 201) {
                    Toast.success("Leave created successfully");
                    formik.resetForm();
                } else if (response.status === 200) {
                    Toast.success("Leave updated successfully");
                } else {
                    throw new Error("Unexpected status code received");
                }
            } catch (error) {
                const errorMessage =
                    error.response?.data?.message || "An error occurred.";
                Toast.error(errorMessage);
            }
        },
    });

    const inputFields = [
        {
            id: 1,
            labelName: "Leave Reason",
            inputType: "text",
            inputId: "leaveReason",
            onChange: formik.handleChange,
            value: formik.values.leaveReason,
            errors: formik.errors.leaveReason,
            isTouched: formik.touched.leaveReason,
        }
    ];

    const dateFields = [
        {
            id: 1,
            labelName: "Leave Start Date",
            inputId: "leaveStartDate",
            onChange: (date) => formik.setFieldValue("leaveStartDate", date),
            value: formik.values.leaveStartDate,
            errors: formik.errors.leaveStartDate,
            isTouched: formik.touched.leaveStartDate,
        },
        {
            id: 2,
            labelName: "Leave End Date",
            inputId: "leaveEndDate",
            onChange: (date) => formik.setFieldValue("leaveEndDate", date),
            value: formik.values.leaveEndDate,
            errors: formik.errors.leaveEndDate,
            isTouched: formik.touched.leaveEndDate,
        },
    ];

    const selectFields = [
        {
            id: 1,
            labelName: "Leavetype",
            inputType: "select",
            inputId: "leavetype",
            value: formik.values.leavetype,
            errors: formik.errors.leavetype,
            isTouched: formik.touched.leavetype,
            options: ["Medical", "Casual"],
        },
    ];

    return (
        <Paper elevation={3} sx={{ p: 2, width: "100%" }}>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                {inputFields.map((obj) => (
                    <Input
                        key={obj.id}
                        labelName={obj.labelName}
                        inputType={obj.inputType}
                        inputId={obj.inputId}
                        onChange={obj.onChange}
                        onBlur={obj.onBlur}
                        value={obj.value}
                        errors={obj.errors}
                        isTouched={obj.isTouched}
                    />
                ))}
                {dateFields.map((obj) => (
                    <LocalizationProvider key={obj.id} dateAdapter={AdapterDayjs}>
                        <DatePicker
                            key={obj.id}
                            id={obj.inputId}
                            label={obj.labelName}
                            value={obj.value}
                            onChange={obj.onChange}
                            sx={{ width: "100%" }}
                            format="DD/MM/YYYY"
                            disablePast
                        />
                        {obj.errors ? <p className="error-text">{obj.errors}</p> : <p></p>}
                    </LocalizationProvider>
                ))}
                {selectFields.map((obj) => (
                    <MySelect
                        labelName={obj.labelName}
                        inputId={obj.inputId}
                        options={obj.options}
                        onChange={formik.handleChange}
                        value={obj.value}
                        errors={obj.errors}
                        isTouched={obj.isTouched}
                    />
                ))}
                <Button
                    sx={{ padding: "13px 15px" }}
                    variant="contained"
                    type="submit"
                    onClick={formik.handleSubmit}
                    fullWidth
                >
                    {statusOfIsEditing ? "Edit Holiday" : "Create Holiday"}
                </Button>
            </form>
        </Paper>
    );
}
