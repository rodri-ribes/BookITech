import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Search from "../Search/Search";
import CartShopping from "../CartShopping/CartShopping";
import { useDispatch, useSelector } from "react-redux";
import { getUser, vaciarFavs, getLibros, cleanSearchTitle } from "../../redux/features/data/dataSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/index";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import axios from 'axios';
const { REACT_APP_API } = process.env;

function NavBar({ user, setUser }) {
    const [click, setClick] = useState({});
    const [render, setRender] = useState(false);

    const navigate = useNavigate();

    const changeClick = () => {
        setClick(!click);
    };

    let userr = useSelector((state) => state.data.user);
    let cleanSearch = useSelector((state) => state.data.cleanSearch);
    let dispatch = useDispatch();

    const logOut = () => {
        signOut(auth);
        window.localStorage.removeItem("user");
        dispatch(vaciarFavs());
    };

    const handleLogout = async () => {
        window.localStorage.removeItem("user");
        dispatch(getUser(null));
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    const pagesLog = ["Search", "Favorites", "Profile"];
    const pagesNoLog = ["SignIn", "SignUp"];
    const pagesNoLog2 = ["SignIn", "SignUp", "Search"];
    const pagesAdmin = ["Search", "Admin", "Logout"];

    const settings = ["Profile", "Favorites", "Logout"];

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);


    // const [sizeNav, setSizeNav] = useState("");

    // const sizeH = {
    //     width: { sm: `calc(100% - ${drawerWidth}px)` },
    //     ml: { sm: `${drawerWidth}px` },
    //     backgroundColor: "#0f243b",
    //     color: "#DADADA",
    // };

    // const sizeOthers = {
    //     backgroundColor: "#0f243b",
    //     color: "#DADADA",
    // };

    // useEffect(() => {
    //     if (window.location.pathname === "/") {
    //         setSizeNav(sizeH);
    //     } else {
    //         setSizeNav(sizeOthers);
    //     }
    // }, [setSizeNav]);
    const setCleanInput = () =>{
        cleanSearch('')
        dispatch(cleanSearchTitle())
    }


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        if (window.location.pathname !== '/Search') {
            cleanSearch('')
            dispatch(cleanSearchTitle())
        }
        setAnchorElUser(null);
    };

    const textLink = {
        textDecoration: "none",
        color: "#DADADA",
        fontFamily: "monospace",
    };
    const textLink2 = {
        textDecoration: "none",
        color: "#0a1929",
        fontFamily: "monospace",
    };

    // const clickIcon = () => {
    //     setRender(true);
    //     cleanSearch("");
    // };

    const clickIcon = () => {
        setRender(true)
        cleanSearch('')
        dispatch(cleanSearchTitle())
    }


    useEffect(() => {
        if (render) {
            dispatch(getLibros())

        }
        setRender(false);
    }, [render]);


    return (
        <>
            <AppBar
                sx={{
                    backgroundColor: "#0f243b",
                    color: "#DADADA",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                position="sticky"
            // sx={{ backgroundColor: "#0f243b", color: "#DADADA" }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link to="/" style={textLink}>
                            <IconButton
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    color: "#DADADA",
                                    mr: 2,
                                }}
                            >
                                <img
                                    src="/favicon.ico"
                                    alt="logo"
                                    width="40px"
                                />
                            </IconButton>
                        </Link>
                        <Link to="/" style={textLink}>
                            <Typography
                                variant="h6"
                                onClick={() => clickIcon()}
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", md: "flex" },
                                    fontFamily: "monospace",
                                    fontWeight: 800,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                BookITech
                            </Typography>
                        </Link>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none" },
                            }}
                        >
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                // onClose={handleCloseNavMenu}
                                onClick={()=>{
                                    handleCloseNavMenu();
                                    setCleanInput();
                                }}
                                sx={{
                                    display: {
                                        xs: "block",
                                        md: "none",
                                    },
                                }}
                            >
                                {pagesNoLog.map((page) => {
                                    if (
                                        userr ||
                                        window.localStorage.getItem("user")
                                    ) {
                                        if (
                                            page !== "SignUp" &&
                                            page !== "SignIn"
                                        ) {
                                            return (
                                                <MenuItem
                                                    key={page}
                                                    // onClick={handleCloseNavMenu}
                                                    onClick={()=>{
                                                        handleCloseNavMenu();
                                                        setCleanInput();
                                                    }}
                                                >
                                                    <Link
                                                        to={`/${page}`}
                                                        style={textLink}
                                                    >
                                                        <Typography textAlign="center">
                                                            {page}
                                                        </Typography>
                                                    </Link>
                                                </MenuItem>
                                            );
                                        }
                                    } else {
                                        if (
                                            page !== "Favorites" &&
                                            page !== "Profile"
                                        ) {
                                            return (
                                                <MenuItem
                                                    key={page}
                                                    // onClick={handleCloseNavMenu}
                                                    onClick={()=>{
                                                        handleCloseNavMenu();
                                                        setCleanInput();
                                                    }}
                                                >
                                                    <Link
                                                        to={`/${page}`}
                                                        style={textLink2}
                                                    >
                                                        <Typography textAlign="center">
                                                            {page}
                                                        </Typography>
                                                    </Link>
                                                </MenuItem>
                                            );
                                        }
                                    }
                                })}
                            </Menu>
                        </Box>

                        <Link to="/" style={textLink}>
                            <IconButton
                                sx={{
                                    display: { md: "none" },
                                    color: "#DADADA",
                                    mr: 1,
                                }}
                            >
                                <img
                                    src="/favicon.ico"
                                    alt="logo"
                                    width="40px"
                                />
                            </IconButton>
                        </Link>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            {pagesLog.map((page) => {
                                if (
                                    userr ||
                                    window.localStorage.getItem("user")
                                ) {
                                    if (
                                        page !== "SignUp" &&
                                        page !== "SignIn"
                                    ) {
                                        return (
                                            <Button
                                                key={page}
                                                // onClick={handleCloseNavMenu}
                                                onClick={()=>{
                                                    handleCloseNavMenu();
                                                    setCleanInput();
                                                }}
                                                sx={{
                                                    my: 2,
                                                    color: "white",
                                                    display: "block",
                                                }}
                                            >
                                                <Link
                                                    to={`/${page}`}
                                                    style={textLink}
                                                >
                                                    {page}
                                                </Link>
                                            </Button>
                                        );
                                    } else if (userr && userr.rol === "admin") {
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Link to="/admin" style={textLink2}>
                                                <Typography
                                                    textAlign={"center"}
                                                >
                                                    Admin
                                                </Typography>
                                            </Link>
                                        </MenuItem>;
                                    }
                                } else {
                                    if (
                                        page !== "Favorites" &&
                                        page !== "Profile"
                                    ) {
                                        return (
                                            <Button
                                                key={page}
                                                // onClick={handleCloseNavMenu}
                                                onClick={()=>{
                                                    handleCloseNavMenu();
                                                    setCleanInput();
                                                }}
                                                sx={{
                                                    my: 2,
                                                    color: "white",
                                                    display: "block",
                                                }}
                                            >
                                                <Link
                                                    to={`/${page}`}
                                                    style={textLink}
                                                >
                                                    {page}
                                                </Link>
                                            </Button>
                                        );
                                    }
                                }
                            })}
                        </Box>
                        <Search />
                        <CartShopping />
                        {userr || window.localStorage.getItem("user") ? (
                            <h1> </h1>
                        ) : (
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                                sx={{ display: { md: "none" } }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                        {userr || window.localStorage.getItem("user") ? (
                            <>
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <IconButton
                                            onClick={handleOpenUserMenu}
                                            sx={{ p: 0, mr: 1 }}
                                        >
                                            <Avatar
                                                alt="Avatar"
                                                src={userr?.img}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: "45px" }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Link
                                                to="/profile"
                                                style={textLink2}
                                            >
                                                <Typography textAlign="center">
                                                    Profile
                                                </Typography>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Link to="/admin" style={textLink2}>
                                                <Typography textAlign="center">
                                                    Admin
                                                </Typography>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Link
                                                to="/search"
                                                style={textLink2}
                                            >
                                                <Typography textAlign="center">
                                                    Search
                                                </Typography>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Link
                                                to="/favorites"
                                                style={textLink2}
                                            >
                                                <Typography textAlign="center">
                                                    Favorites
                                                </Typography>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Link
                                                to="/"
                                                style={textLink2}
                                                onClick={() => handleLogout()}
                                            >
                                                <Typography textAlign="center">
                                                    Logout
                                                </Typography>
                                            </Link>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            </>
                        ) : (
                            <>
                                {pagesNoLog.map((page) => {
                                    if (
                                        userr ||
                                        window.localStorage.getItem("user")
                                    ) {
                                        if (
                                            page !== "SignUp" &&
                                            page !== "SignIn"
                                        ) {
                                            return (
                                                <MenuItem
                                                    key={page}
                                                    // onClick={handleCloseNavMenu}
                                                    onClick={()=>{
                                                        handleCloseNavMenu();
                                                        setCleanInput();
                                                    }}
                                                >
                                                    <Link
                                                        to={`/${page}`}
                                                        style={textLink}
                                                    >
                                                        <Typography textAlign="center">
                                                            {page}
                                                        </Typography>
                                                    </Link>
                                                </MenuItem>
                                            );
                                        }
                                    } else {
                                        if (
                                            page !== "Favorites" &&
                                            page !== "Profile"
                                        ) {
                                            return (
                                                <MenuItem
                                                    key={page}
                                                    // onClick={handleCloseNavMenu}
                                                    onClick={()=>{
                                                        handleCloseNavMenu();
                                                        setCleanInput();
                                                    }}
                                                    sx={{
                                                        display: {
                                                            xs: "none",
                                                            md: "flex",
                                                        },
                                                    }}
                                                >
                                                    <Link
                                                        to={`/${page}`}
                                                        style={textLink}
                                                    >
                                                        <Typography textAlign="center">
                                                            {page}
                                                        </Typography>
                                                    </Link>
                                                </MenuItem>
                                            );
                                        }
                                    }
                                })}
                            </>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default NavBar;
