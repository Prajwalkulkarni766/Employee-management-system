import Button from "@mui/material/Button";

export default function MyButton({ labelName }) {
  return (
    <Button sx={{ padding: "13px 15px" }} variant="contained" fullWidth>
      {labelName}
    </Button>
  );
}
