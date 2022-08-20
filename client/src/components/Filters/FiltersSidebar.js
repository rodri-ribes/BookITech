import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { BsSortAlphaDown } from "react-icons/bs";
import { BsSortAlphaUp } from "react-icons/bs";
import { BsSortDownAlt } from "react-icons/bs";
import { BsSortUpAlt } from "react-icons/bs";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import {
    FilTheme,
    ORdenAZ,
    PriceRange,
    ChangeRange,
} from "../../redux/features/data/dataSlice";


const drawerWidth = 240;

function FiltersSidebar(props, { setPagina }) {
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

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    function handleChangeRangeMin(e) {
        e.preventDefault();
        handleDrawerToggle()
        dispatch(ChangeRange("MintoMax"));
        setPagina(1);
    }

    function handleChangeRangeMax(e) {
        e.preventDefault();
        handleDrawerToggle()
        dispatch(ChangeRange("MaxtoMin"));
        setPagina(1);
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
        console.log(e.target.textContent);
        dispatch(FilTheme(e.target.textContent));
        setPagina(1);
    }

    function handleRange(e) {
        e.preventDefault();
        handleDrawerToggle()
        if (!range.max || !range.min) {
            alert("Máx and Min Required");
        } else {
            dispatch(PriceRange(range));
            setRange({ max: "", min: "" });
            // console.log('holaaa');
            setPagina(1);
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
    }
    function handleOrdenAZ(e) {
        e.preventDefault();
        handleDrawerToggle()
        console.log(e.target.value);
        dispatch(ORdenAZ("A-Z"));
        setPagina(1);
    }

    function handleOrdenZA(e) {
        e.preventDefault();
        handleDrawerToggle()
        console.log(e.target.value);
        dispatch(ORdenAZ("Z-A"));
        setPagina(1);
    }



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
            <Toolbar sx={{ mt: 4, backgroundColor: "#07121e", color: "#DADADA" }} />
            <Divider />
            <List>
                <Typography
                    sx={{
                        ml: 2,
                        mb: 1,
                        fontFamily: "monospace",
                        fontWeight: 800,
                        letterSpacing: ".1rem",
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
                        onClose={handleDrawerToggle}
                    >
                        <BsSortAlphaDown color="#DADADA" />
                        <ListItemText primary={"A to Z"} sx={{ ml: 4 }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ fontSize: "22px" }}>
                    <ListItemButton
                        onClick={(e) => handleOrdenZA(e)}
                        value="Z-A"
                        sx={{ fontSize: "22px" }}
                        onClose={handleDrawerToggle}
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
                        fontFamily: "monospace",
                        fontWeight: 800,
                        letterSpacing: ".1rem",
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
                        onClose={handleDrawerToggle}
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
                        onClose={handleDrawerToggle}
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
                        fontFamily: "monospace",
                        fontWeight: 800,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    Filter by price
                </Typography>
                {/* <form onSubmit={(e) => handleRange(e)}> */}
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
                                // type="submit"
                                onClose={handleDrawerToggle}
                                onClick={(e) => handleRange(e)}
                            >
                                Filter by price
                            </Button>
                        </ListItem>
                    </Box>
                {/* </form> */}
            </List>
            <List>
                <Typography
                    sx={{
                        ml: 2,
                        mb: 3,
                        fontFamily: "monospace",
                        fontWeight: 800,
                        letterSpacing: ".1rem",
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
                                <ListItemButton
                                    key={k}
                                    value={e}
                                    sx={{ width: "100%", color: "#DADADA" }}
                                    onClick={(e) => handleTheme(e)}
                                    onClose={handleDrawerToggle}
                                >
                                    {e.toUpperCase()}
                                </ListItemButton>
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
        <Box sx={{ display: "flex", ml:-1, mt: 4}} position= "fixed">
            <CssBaseline />
            <Toolbar sx={{ display: "flex", flexDirection: "column", ml:-1}}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: "none" } }}
                >
                    <Typography fontSize={"16px"} sx={{fontWeight: 800,
                        letterSpacing: ".2rem",}} variant="h6" noWrap component="div">
                        FILTERS
                    </Typography>
                </IconButton>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: "none"} }}
                >
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
                        display: { xs: "block", md: "none" },
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
                        display: { xs: "none", md: "block" },
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
