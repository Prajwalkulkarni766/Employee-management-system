import { useFormik } from "formik";
import * as Yup from "yup";
import Paper from "@mui/material/Paper";
import Toast from "../helper/Toast";
import Input from "../components/Input";
import axiosInstance from "../axios/axiosInstance";
import MyDatePicker from "../components/MyDatePicker";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import MySelect from "../components/MySelect";

export default function LeaveForm({ statusOfIsEditing }) {

    const leaveSchema = Yup.object({
        leaveType: Yup.string().required("Leave Type is required"),
        leaveReason: Yup.string().required("Leave Reason is required"),
        leaveStartDate: Yup.date().required("Leave Start Date Required"),
        leaveEndDate: Yup.date().required("Leave End Date Required"),
    });

    const formik = useFormik({
        initialValues: {
            leaveType: "",
            leaveReason: ""
        },
        validationSchema: leaveSchema,
        onSubmit: async (values) => {
            try {
                // const response = statusOfIsEditing
                //     ? await axiosInstance.patch("/v1/holiday", values)
                //     : await axiosInstance.post("/v1/holiday", values);

                // if (response.status === 201) {
                //     Toast.success("Holiday created successfully");
                //     formik.resetForm();
                // } else if (response.status === 200) {
                //     Toast.success("Holiday updated successfully");
                // } else {
                //     throw new Error("Unexpected status code received");
                // }
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
            // onBlur: () => {
            //     if (formik.touched.leaveReason || formik.errors.leaveReason) {
            //         // Toast.error(formik.errors.leaveReason);
            //     }
            // },
            value: formik.values.leaveReason,
            errors: formik.errors.leaveReason,
            isTouched: formik.touched.leaveReason,
        }
    ];

    const dateFields = [
        {
            id: 1,
            labelName: "Leave Start Date",
            inputType: "date",
            inputId: "leaveStartDate",
            onChange: formik.handleChange,
            // onBlur: () => {
            //     if (formik.touched.leaveStartDate || formik.errors.leaveStartDate) {
            //         Toast.error(formik.errors.leaveStartDate);
            //     }
            // },
            value: formik.values.leaveStartDate,
            errors: formik.errors.leaveStartDate,
            isTouched: formik.touched.leaveStartDate,
        },
        {
            id: 2,
            labelName: "Leave End Date",
            inputType: "date",
            inputId: "leaveEndDate",
            onChange: formik.handleChange,
            // onBlur: () => {
            //     if (formik.touched.leaveEndDate || formik.errors.leaveEndDate) {
            //         Toast.error(formik.errors.leaveEndDate);
            //     }
            // },
            value: formik.values.leaveEndDate,
            errors: formik.errors.leaveEndDate,
            isTouched: formik.touched.leaveEndDate,
        },
    ];

    const selectFields = [
        {
            id: 1,
            labelName: "Leave Type",
            inputType: "select",
            inputId: "leaveType",
            value: formik.values.leaveType,
            errors: formik.errors.leaveType,
            isTouched: formik.touched.leaveType,
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
                    <MyDatePicker
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
