import { Typography } from "@mui/material";

export default function PageHeading({ pageName }) {
  return (
    <Typography variant="h6" marginBottom={2} sx={{ width: "100%" }}>
      {pageName}
    </Typography>
  );
}
