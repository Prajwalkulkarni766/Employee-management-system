import TableHeader from "../../components/TableHeader";
import TableBody from "../../components/TableBody";
import { useEffect } from "react";
import axios from "axios";

export default function DashBoard() {
  useEffect(() => {
    axios
      .get("/api/v1/getEmployee")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <>
      <div className="container mt-5">
        <div className="table-responsive">
          <table className="table">
            <TableHeader
              columns={[
                "Sr. No.",
                "Image",
                "Email",
                "Mobile number",
                "Designation",
                "Gender",
                "Course",
                "Created Date",
                "Action",
              ]}
            />
            <TableBody rows={["1"]} />
          </table>
        </div>
      </div>
    </>
  );
}
