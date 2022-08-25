import React, { useState } from "react";
import { useSelector } from 'react-redux';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
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
    ChangeRange,ResetFil,
} from "../../redux/features/data/dataSlice";
import {Alert} from 'react-st-modal'


function DrawerDesktop( { setPagina }) {


    let setInput = useSelector((state) => state.data.PutSetInput);

    const dispatch = useDispatch();
    const [range, setRange] = useState({
        max: "",
        min: "",
    });
    const [/*errors*/, setErrors] = useState({});

    const tematica = [
        "mongo",
        "mongodb",
        "mongoose",
        "java",
        "javascript",
        "html",
        "css",
        "python",
        "php",
        "react",
        // "redux",
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
        dispatch(ChangeRange("MintoMax"));
        setInput(1);
        setPagina(1);
    }

    function handleChangeRangeMax(e) {
        dispatch(ChangeRange("MaxtoMin"));
        setInput(1);
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
        setInput(1);
        setPagina(1);
        dispatch(FilTheme(e.target.textContent));
    }

    async function handleRange(e) {
        if (!range.max || !range.min) {
            await Alert("Máx and Min Required");
        } else {
            dispatch(PriceRange(range));
            setRange({ max: "", min: "" });
            setInput(1);
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
        dispatch(ORdenAZ("A-Z"));
        setInput(1);
        setPagina(1);
    }

    function handleOrdenZA(e) {
        dispatch(ORdenAZ("Z-A"));
        setInput(1);
        setPagina(1);
    }
    function ClearFilter() {
        dispatch(ResetFil())
        setInput(1);
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
                        fontFamily: "monospace",
                        fontWeight: 800,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    Filter by price
                </Typography>
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
                                onClick={(e) => handleRange(e)}
                            >
                                Filter by price
                            </Button>
                        </ListItem>
                    </Box>
            </List>
            <ListItem >
                    <ListItemButton onClick={() => ClearFilter()}>RESET</ListItemButton>
            </ListItem>
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
                >
                    {tematica?.map((e, k) => {
                        return (
                            <ListItem disablePadding>
                                <ListItemButton
                                    key={k}
                                    value={e}
                                    sx={{ width: "100%", color: "#DADADA" }}
                                    onClick={(e) => handleTheme(e)}
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

    return (
        <>
            {drawer}
        </>
    )
}

export default DrawerDesktop