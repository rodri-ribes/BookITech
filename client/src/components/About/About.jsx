import { Avatar, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const stylesText = {
    mt: 2,
    fontFamily: "monospace",
    fontSize: "1.2rem"
}

const stylesAvatar = {
    mt: 2,
    width: 60,
    height: 60
}

const stylesIcon = {
    mt: 2,
    width: 50,
    height: 50
}

function About() {
    return (
        <>
            <Grid
                sx={{
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "row",
                    alignItem: "baseline",
                }}
            >
                <Grid sx={{ ml: 5, mt: 8 }}>
                    <img src="/favicon.ico" alt="logo" width="200px" />
                </Grid>
                <Grid>
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
            </Grid>
            <Grid>
                <Typography sx={{ mt: 10 }}>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum."
                </Typography>
            </Grid>
            <Grid display="flex">
                <Grid sx={{ mt: 5, mr: 10 }}>
                    <Grid display="flex">
                        <Avatar src={"Rodri"} alt="avatar" sx={stylesAvatar} />
                            <Typography sx={stylesText}>
                                Rodrigo Apellido Apellido
                            </Typography>
                            <LinkedInIcon sx={stylesIcon} />
                            <GitHubIcon sx={stylesIcon} />
                    </Grid>
                    <Grid display="flex">
                        <Avatar src={"Pablo"} alt="avatar" sx={stylesAvatar} />
                            <Typography sx={stylesText}>
                                Pablo Apellido Apellido
                            </Typography>
                            <LinkedInIcon sx={stylesIcon} />
                            <GitHubIcon sx={stylesIcon} />
                    </Grid>
                    <Grid display="flex">
                        <Avatar src={"Seba"} alt="avatar" sx={stylesAvatar} />
                            <Typography sx={stylesText}>
                                Sebastian Apellido Apellido
                            </Typography>
                            <LinkedInIcon sx={stylesIcon}  />
                            <GitHubIcon sx={stylesIcon} />
                    </Grid>
                    <Grid display="flex">
                        <Avatar src={"Lucho"} alt="avatar" sx={stylesAvatar} />
                            <Typography sx={stylesText}>
                                Luciano Apellido Apellido
                            </Typography>
                            <LinkedInIcon sx={stylesIcon} />
                            <GitHubIcon sx={stylesIcon} />
                    </Grid>
                </Grid>
                <Grid sx={{ mt: 5, ml:"20%" }}>
                    <Grid display="flex">
                        <Avatar src={"Felipe"} alt="avatar" sx={stylesAvatar}/>
                            <Typography sx={stylesText}>
                                Felipe Apellido Apellido
                            </Typography>
                            <LinkedInIcon sx={stylesIcon} />
                            <GitHubIcon sx={stylesIcon} />
                    </Grid >
                    <Grid display="flex">
                        <Avatar src={"Jorge"} alt="avatar" sx={stylesAvatar} /> 
                            <Typography sx={stylesText}>
                                Jorge Apellido Apellido
                            </Typography>
                            <LinkedInIcon sx={stylesIcon} />
                            <GitHubIcon sx={stylesIcon} />
                    </Grid>
                    <Grid display="flex">
                        <Avatar src={"Sergio"} alt="avatar" sx={stylesAvatar} />
                            <Typography sx={stylesText}>
                                Sergio Apellido Apellido
                            </Typography>
                            <LinkedInIcon sx={stylesIcon} />
                            <GitHubIcon sx={stylesIcon} />
                    </Grid>
                </Grid>
            </Grid>
        </>

        // logo PNG diseñado por Ideasign de  <a href="https://es.pngtree.com">Pngtree.com</a>
    );
}

export default About;
