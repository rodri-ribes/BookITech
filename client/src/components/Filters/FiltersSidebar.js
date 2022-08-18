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

    function handleChangeRange(e) {
        e.preventDefault();
        console.log(e.target.value);
        dispatch(ChangeRange(e.target.value));
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
        e.preventDefault();
        console.log(e.target.value);
        dispatch(FilTheme(e.target.value));
        setPagina(1);
        setOrden(e.target.value);
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
    function handleOrden(e) {
        e.preventDefault();
        dispatch(ORdenAZ(e.target.value));
        setPagina(1);
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const CssTextField = styled(TextField)({
        // "& label.Mui-focused": {
        //     color: "#DADADA",
        // },
        "& label": {
            color: "#818181",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#DADADA",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#818181",
            },
            "&:hover fieldset": {
                borderColor: "#DADADA",
            },
            "&.Mui-focused fieldset": {
                borderColor: "green",
            },
        },
    });

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
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    Sort by name
                </Typography>
                {["A to Z", "Z to A"].map((text, index) => (
                    <ListItem
                        key={text}
                        disablePadding
                        sx={{ fontSize: "22px" }}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? (
                                    <BsSortAlphaDown color="#DADADA" />
                                ) : (
                                    <BsSortAlphaUp color="#DADADA" />
                                )}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <Typography
                    sx={{
                        ml: 2,
                        mb: 1,
                        // fontFamily: "monospace",
                        fontWeight: 800,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    Sort by price
                </Typography>
                {["Low to High", "High to Low"].map((text, index) => (
                    <ListItem
                        key={text}
                        disablePadding
                        sx={{ fontSize: "22px" }}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? (
                                    <BsSortDownAlt color="#DADADA" />
                                ) : (
                                    <BsSortUpAlt color="#DADADA" />
                                )}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <Typography
                    sx={{
                        ml: 2,
                        mb: 3,
                        // fontFamily: "monospace",
                        fontWeight: 800,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    Filter by price
                </Typography>
                <ListItem disablePadding>
                    {/* <ListItemIcon> */}
                    {/* <PriceChangeIcon
                        sx={{
                            color: "#DADADA",
                            ml: 2,
                            mr: 1,
                            fontSize: "30px",
                        }}
                    /> */}
                    {/* </ListItemIcon> */}
                    <CssTextField
                        sx={{ mr: 1 }}
                        label="Min"
                        id="custom-css-outlined-input"
                    />
                    <CssTextField
                        sx={{ mr: 1 }}
                        label="Max"
                        id="custom-css-outlined-input"
                    />
                </ListItem>
                <ListItem disablePadding>
                    {/* <ListItemIcon> */}
                    {/* </ListItemIcon> */}
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
                <Typography
                    sx={{
                        ml: 2,
                        mb: 3,
                        // fontFamily: "monospace",
                        fontWeight: 800,
                        letterSpacing: ".3rem",
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
