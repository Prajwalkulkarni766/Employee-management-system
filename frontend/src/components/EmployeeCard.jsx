import user1 from "../assets/user1.jpg";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Divider, Box, LinearProgress, Container } from "@mui/material";
import * as React from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

function SkillProgress({ skill, value, color }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" color="text.secondary">
        {skill}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": { backgroundColor: color },
        }}
      />
    </Box>
  );
}

function EmployeeProfileCard() {
  return (
    <>
      <Card sx={{ width: "100%" }}>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <CardMedia
            component="img"
            image={user1}
            alt="Paella dish"
            sx={{
              borderRadius: "50%",
              width: "50%",
              height: "auto",
            }}
          />
        </Container>
        <CardContent>
          <Divider sx={{ my: 2 }} />
          <SkillProgress skill="OPD" value={60} color="#00c49f" />
          <SkillProgress skill="Operations" value={40} color="#ff8042" />
          <SkillProgress skill="Client Visit" value={50} color="#0088fe" />
          <SkillProgress skill="RND" value={90} color="#a4de6c" />
        </CardContent>
      </Card>
    </>
  );
}

function EmployeeAbout({ employee }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ width: "100%", p: 2 }}>
      <Box sx={{ display: "grid", gap: 2, mb: 2 }}>
        <Typography variant="h6">
          <b>About</b>
        </Typography>
        <Typography variant="body1">
          <b>Full Name</b> {`${employee.firstName} ${employee.lastName}`}
        </Typography>
        <Typography variant="body1">
          <b>Mobile</b> {`${employee.mobileNumber}`}
        </Typography>
        <Typography variant="body1">
          <b>Email</b> {`${employee.email}`}
        </Typography>
        <Typography variant="body1">
          <b>Gender</b> {`${employee.gender}`}
        </Typography>
        <Typography variant="body1">
          <b>Address</b> {`${employee.address}`}
        </Typography>
        <Typography variant="body1">
          <b>Role</b> {`${employee.role}`}
        </Typography>
        <Typography variant="body1">
          <b>Designation</b> {`${employee.designation}`}
        </Typography>
        <Typography variant="body1">
          <b>Date of birth</b> {`${employee.dateOfBirth}`}
        </Typography>
        <Typography variant="body1">
          <b>Date of joining</b> {`${employee.joiningDate}`}
        </Typography>
        <Typography variant="body1">
          <b>Salary</b> {`${employee.salary}`}
        </Typography>
      </Box>
      <Divider />

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Worked as Professor and Head of the department at Sarda Collage, Rajkot,
        Gujarat from 2003-2015
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
        <b>Education</b>
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {`${employee.education}`}
      </Typography>

      <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
        <b>Experience</b>
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {/* experience */}
      </Typography>
    </Card>
  );
}

export default function EmployeeCard() {
  const employee = useSelector((state) => state.employee.employee);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <EmployeeProfileCard />
      </Grid>
      <Grid item xs={8}>
        <EmployeeAbout employee={employee} />
      </Grid>
    </Grid>
  );
}
