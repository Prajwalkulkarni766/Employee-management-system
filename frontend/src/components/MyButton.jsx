import Button from "@mui/material/Button";

export default function MyButton({ labelName, onclick }) {
  return (
    <Button
      sx={{ padding: "13px 15px" }}
      variant="contained"
      onclick={onclick}
      fullWidth
    >
      {labelName}
    </Button>
  );
}
