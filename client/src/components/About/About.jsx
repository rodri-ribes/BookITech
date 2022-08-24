import {
    Avatar,
    Container,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const data = [
    {
        avatar: "Rodri",
        name: "Rodri Apellido Apellido",
        linkedin: "https://www.google.com",
        github: "",
    },
    {
        avatar: "Pablo",
        name: "Pablo David Clavijo",
        linkedin: "http://linkedin.com/in/pablo-david-clavijo-7653a610a/",
        github: "http://github.com/pablodclavijo",
    },
    {
        avatar: "photo_2022-08-24_18-37-45.png",
        name: "Sebastian Esteban Torreiro",
        linkedin: "https://www.linkedin.com/in/sebastian-torreiro-a90bb6181/",
        github: "https://github.com/SebastianTorreiro",
    },
    {
        avatar: "Lucho",
        name: "Luciano Ezequiel Diaz Ocampo",
        linkedin: "https://www.linkedin.com/in/luciano-diaz-ocampo/",
        github: "https://github.com/LuchoD99",
    },
];

const data2 = [
    {
        avatar: "/1652917721112.png",
        name: "Felipe Gómez Mufdi",
        linkedin: "https://www.linkedin.com/in/mufdidev/",
        github: "https://github.com/Mufdi",
    },
    {
        avatar: "Jorge",
        name: "Jorge Apellido Apellido",
        linkedin: "",
        github: "",
    },
    {
        avatar: "photo_2022-08-24_17-52-20.png",
        name: "Sergio Yepes Gualteros",
        linkedin: "https://www.linkedin.com/in/sergio-yepes-2b7158214/",
        github: "https://github.com/SergioYepes",
    },
];

const stylesText = {
    mt: 2,
    fontFamily: "monospace",
    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
    color: "#DADADA",
};

const stylesAvatar = {
    mt: 2,
    width: { xs: 30, sm: 40, md: 60 },
    height: { xs: 30, sm: 40, md: 60 },
};

const stylesIcon = {
    mt: 2,
    width: { xs: 30, sm: 40, md: 50 },
    height: { xs: 30, sm: 40, md: 50 },
    color: "#DADADA",
};

function About() {
    return (
        <Container maxWidth="xl">
            <Grid
                sx={{
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "row",
                    alignItem: "baseline",
                }}
            >
                <Grid
                    item
                    sx={{
                        ml: 5,
                        mt: 3,
                        display: { xs: "none", sm: "none", md: "flex" },
                    }}
                >
                    <img src="/favicon.ico" alt="logo" width="200px" />
                </Grid>
                <Grid
                    item
                    sx={{
                        ml: 5,
                        mt: 3,
                        display: { xs: "none", sm: "flex", md: "none" },
                    }}
                >
                    <img src="/favicon.ico" alt="logo" width="150px" />
                </Grid>
                <Grid
                    item
                    sx={{
                        ml: 5,
                        mt: 3,
                        display: { xs: "flex", sm: "none", md: "none" },
                    }}
                >
                    <img src="/favicon.ico" alt="logo" width="60px" />
                </Grid>
                <Grid>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mt: { xs: 5, sm: 6, md: 7 },
                            ml: { xs: 4, sm: 6, md: 10 },
                            display: "flex",
                            fontFamily: "monospace",
                            fontWeight: 800,
                            fontSize: { xs: "1.5rem", sm: "5rem", md: "7rem" },
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
            <Grid sx={{ display: { xs: "grid", sm: "grid", md: "flex" } }}>
                <Grid
                    item
                    xs={8}
                    sm
                    container
                    display="flex"
                    justifyContent="space-around"
                >
                    <TableContainer sx={{ mt: 5 }}>
                        <Table
                            sx={{
                                minWidth: 650,
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                            aria-label="simple table"
                        >
                            <TableBody>
                                {data.map((d) => {
                                    return (
                                        <TableRow
                                            sx={{
                                                "&:last-child td, &:last-child th":
                                                    { border: 0 },
                                            }}
                                        >
                                            <TableCell align="left">
                                                <Avatar
                                                    src={d.avatar}
                                                    alt="avatar"
                                                    sx={stylesAvatar}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    align="left"
                                                    sx={stylesText}
                                                >
                                                    {d.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton>
                                                    <a href={d.linkedin}>
                                                        <LinkedInIcon
                                                            sx={stylesIcon}
                                                        />
                                                    </a>
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton>
                                                    <a href={d.github}>
                                                        <GitHubIcon
                                                            sx={stylesIcon}
                                                        />
                                                    </a>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid
                    item
                    xs={8}
                    sm
                    container
                    display="flex"
                    justifyContent="space-around"
                >
                    <TableContainer
                        sx={{
                            mt: { xs: 0, sm: 0, md: 5 },
                            ml: { xs: 0, sm: 0, md: 5 },
                        }}
                    >
                        <Table
                            sx={{
                                minWidth: 650,
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                            aria-label="simple table"
                        >
                            <TableBody>
                                {data2.map((d) => {
                                    return (
                                        <TableRow
                                            sx={{
                                                "&:last-child td, &:last-child th":
                                                    { border: 0 },
                                            }}
                                        >
                                            <TableCell align="left">
                                                <Avatar
                                                    src={d.avatar}
                                                    alt="avatar"
                                                    sx={stylesAvatar}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    align="left"
                                                    sx={stylesText}
                                                >
                                                    {d.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton>
                                                    <a href={d.linkedin}>
                                                        <LinkedInIcon
                                                            sx={stylesIcon}
                                                        />
                                                    </a>
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton>
                                                    <a href={d.github}>
                                                        <GitHubIcon
                                                            sx={stylesIcon}
                                                        />
                                                    </a>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>

        // logo PNG diseñado por Ideasign de  <a href="https://es.pngtree.com">Pngtree.com</a>
    );
}

export default About;
