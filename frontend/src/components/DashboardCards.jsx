import React from "react";
import { Paper, Grid, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function DashboardCards({ icon: Icon, title, content }) {
    return (
        <Grid item xs={12} sm={6} md={6} lg={3}>
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Stack spacing={2} direction="row">
                    <Icon fontSize="large" />
                        <Stack direction="column">
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                {title}
                            </Typography>
                            <Typography variant="body1">{content}</Typography>
                        </Stack>
                </Stack>
            </Paper>
        </Grid>
    )
}