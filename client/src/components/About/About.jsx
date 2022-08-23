import { Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

function About() {
    return (
        <Grid
            sx={{
                display: "flex",
                justifyContent: "start",
                flexDirection: "row",
                alignItem: "baseline",
            }}
        >
            <Stack sx={{ml: 50, mt: 8}}>
                <img src="/favicon.ico" alt="logo" width="200px" />
            </Stack>
            <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                    mt: 12,
                    ml: 10,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 800,
                    fontSize: "8rem",
                    letterSpacing: "1rem",
                    color: "inherit",
                    textDecoration: "none",
                }}
            >
                BookITech
            </Typography>
        </Grid>
        // logo PNG diseñado por Ideasign de  <a href="https://es.pngtree.com">Pngtree.com</a>
    );
}

export default About;
