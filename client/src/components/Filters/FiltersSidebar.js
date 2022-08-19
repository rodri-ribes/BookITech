import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { BsSortAlphaDown } from "react-icons/bs";
import { BsSortAlphaUp } from "react-icons/bs";
import { BsSortDownAlt } from "react-icons/bs";
import { BsSortUpAlt } from "react-icons/bs";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import {
    FilTheme,
    ORdenAZ,
    PriceRange,
    ChangeRange,
} from "../../redux/features/data/dataSlice";
import style from "./Filters.module.css";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Container, Stack } from "@mui/system";
import { Grid } from "@mui/material";

const drawerWidth = 240;

function FiltersSidebar(props, { setPagina, setOrden }) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const dispatch = useDispatch();
    const [range, setRange] = useState({
        max: "",
        min: "",
    });
    const [errors, setErrors] = useState({});

    const tematica = [
        "mongo",
        "mongodb",
        "mongoose",
        "java",
        "javascript",
        " html",
        "css",
        "python",
        "php",
        "react",
        "redux",
        "perl",
        "swift",
        "rust",
        "sql",
        "ruby",
        "ajax",
        "typescript",
        "express.js",
    ];

    function handleChangeRangeMin(e) {
        e.preventDefault();
        dispatch(ChangeRange("MintoMax"));
        setPagina(1);
        setOrden(e.target.value);
    }

    function handleChangeRangeMax(e) {
        e.preventDefault();
        dispatch(ChangeRange("MaxtoMin"));
        setPagina(1);
        setOrden(e.target.value);
    }

    function validate() {
        let err = {};
        if (!range.min) {
            err.min = "Min Required";
        }
        if (!range.max) {
            err.max = "Máx Required";
        }
        return err;
    }
    function handleTheme(e) {
        // e.preventDefault();
        console.log(e.target.value);
        dispatch(FilTheme(e.target.value));
        setPagina(1);
        // setOrden(e.target.value);
    }

    function handleRange(e) {
        e.preventDefault();
        if (!range.max || !range.min) {
            alert("Máx and Min Required");
        } else {
            dispatch(PriceRange(range));
            setRange({ max: "", min: "" });
            // console.log('holaaa');
            setPagina(1);
            setOrden(e.target.value);
        }
    }
    function handleChange(e) {
        setRange({
            ...range,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validate({
                ...range,
                [e.target.name]: e.target.value,
            })
        );
        setOrden(e.target.value);
    }
    function handleOrdenAZ(e) {
        e.preventDefault();
        dispatch(ORdenAZ("A-Z"));
        setPagina(1);
    }

    function handleOrdenZA(e) {
        e.preventDefault();
        dispatch(ORdenAZ("Z-A"));
        setPagina(1);
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const cssTextField = {
        mr: 1,
        "& .MuiInputBase-root": {
            color: "#DADADA",
        },
        "& .MuiFormLabel-root": {
            color: "#818181",
        },
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#DADADA",
        },
        "& .MuiOutlinedInput-root": {
            "& > fieldset": { borderColor: "#818181" },
        },
        "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
                borderColor: "primary.main",
            },
        },
        "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": {
                borderColor: "#DADADA",
            },
        },
        "& .MuiOutlinedInput-root.Mui-focused fieldset": {
            borderColor: "primary.main",
        },
    };

    const drawer = (
        <div>
            <Toolbar sx={{ backgroundColor: "#07121e", color: "#DADADA" }} />
            <Divider />
            <List>
                <Typography
                    sx={{
                        ml: 2,
                        mb: 1,
                        // fontFamily: "monospace",
                        fontWeight: 800,
                        letterSpacing: ".2rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    Sort by name
                </Typography>
                <ListItem disablePadding sx={{ fontSize: "22px" }}>
                    <ListItemButton
                        onClick={(e) => handleOrdenAZ(e)}
                        value="A-Z"
                        sx={{ fontSize: "22px" }}
                    >
                        <BsSortAlphaDown color="#DADADA" />
                        <ListItemText primary={"A to Z"} sx={{ ml: 4 }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ fontSize: "22px" }}>
                    <ListItemButton
                        onCclick={(e) => handleOrdenZA(e)}
                        value="Z-A"
                        sx={{ fontSize: "22px" }}
                    >
                        <BsSortAlphaUp color="#DADADA" />
                        <ListItemText primary={"Z to A"} sx={{ ml: 4 }} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <Typography
                    sx={{
                        ml: 2,
                        mb: 1,
                        // fontFamily: "monospace",
                        fontWeight: 800,
                        letterSpacing: ".2rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    Sort by price
                </Typography>
                <ListItem disablePadding sx={{ fontSize: "22px" }}>
                    <ListItemButton
                        onClick={(e) => handleChangeRangeMin(e)}
                        value="MintoMax"
                        sx={{ fontSize: "22px" }}
                    >
                        <BsSortDownAlt color="#DADADA" />
                        <ListItemText primary={"Low to High"} sx={{ ml: 4 }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ fontSize: "22px" }}>
                    <ListItemButton
                        onClick={(e) => handleChangeRangeMax(e)}
                        value="MaxtoMin"
                        sx={{ fontSize: "22px" }}
                    >
                        <BsSortUpAlt color="#DADADA" />
                        <ListItemText primary={"High to Low"} sx={{ ml: 4 }} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <Typography
                    sx={{
                        ml: 2,
                        mb: 3,
                        // fontFamily: "monospace",
                        fontWeight: 800,
                        letterSpacing: ".2rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    Filter by price
                </Typography>
                <form onSubmit={(e) => handleRange(e)}>
                    <Box
                        component="form"
                        display="grid"
                        sx={{
                            "& > :not(style)": { m: 1, width: "90%" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <ListItem disablePadding>
                            <TextField
                                sx={cssTextField}
                                label="Min"
                                id="custom-css-outlined-input"
                                type="number"
                                name="min"
                                min={"0"}
                                value={range.min}
                                onChange={(e) => handleChange(e)}
                            />
                            <TextField
                                sx={cssTextField}
                                label="Max"
                                id="custom-css-outlined-input"
                                type="number"
                                name="max"
                                min={"0"}
                                value={range.max}
                                onChange={(e) => handleChange(e)}
                            />
                        </ListItem>
                        <ListItem disablePadding>
                            <Button
                                sx={{
                                    // color: "#DADADA",
                                    mt: 1,
                                    ml: 0,
                                    mb: 3,
                                    mr: 1,
                                    width: "100%",
                                }}
                                variant="outlined"
                                type="submit"
                            >
                                Filter by price
                            </Button>
                        </ListItem>
                    </Box>
                </form>
            </List>
            <List>
                <Typography
                    sx={{
                        ml: 2,
                        mb: 3,
                        // fontFamily: "monospace",
                        fontWeight: 800,
                        letterSpacing: ".2rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    Themes
                </Typography>
                <ListItem
                    disablePadding
                    sx={{ display: "flex", flexDirection: "column", ml: 3 }}
                    // onClick={(e) => handleTheme(e)}
                    onClick={handleDrawerToggle}
                >
                    {tematica?.map((e, k) => {
                        return (
                            <ListItem disablePadding>
                                <MenuItem
                                    key={k}
                                    value={e}
                                    sx={{ width: "100%" }}
                                    onClick={(e) => handleTheme(e)}
                                >
                                    {e.toUpperCase()}
                                </MenuItem>
                            </ListItem>
                        );
                    })}
                </ListItem>
                <Divider />
            </List>
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: "none" } }}
                >
                    <Typography variant="h6" noWrap component="div">
                        Filters
                    </Typography>
                    <FilterAltIcon />
                </IconButton>
            </Toolbar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            backgroundColor: "#07121e",
                            color: "#DADADA",
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    // anchor="bottom"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            backgroundColor: "#07121e",
                            color: "#DADADA",
                            // paddingTop: "75px",
                        },
                    }}
                    open
                    PaperProps={{
                        elevation: 15,
                    }}
                    // open PaperProps={{ style: { height: "875px" } }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

FiltersSidebar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default FiltersSidebar;
