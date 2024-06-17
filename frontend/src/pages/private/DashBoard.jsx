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
  return <>Dashboard</>;
}
