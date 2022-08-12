import React, { useState } from "react";

import { Link } from "react-router-dom";
import Search from "../Search/Search";
import CartShopping from "../CartShopping/CartShopping";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/features/data/dataSlice";
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
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import AdbIcon from "@mui/icons-material/Adb";
import SearchIcon from "@mui/icons-material/Search";


function NavBar({ user, setUser }) {
    const [click, setClick] = useState({});

    const changeClick = () => {
        setClick(!click);
    };

    let userr = useSelector((state) => state.data.user);
    let dispatch = useDispatch();

    const logOut = () => {
        signOut(auth);
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

    const pagesLog = ["Favorites", "Profile", "SignIn", "SignUp"];

    const settings = ["Profile", "Logout"];

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

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
        setAnchorElUser(null);
    };

    const textLink = {
        textDecoration: "none",
        color: "#DADADA"
    }
    const textLink2 = {
        textDecoration: "none",
        color: "#0a1929"
    }

    return (
        <>
            <AppBar
                position="sticky"
                sx={{ backgroundColor: "#0f243b", color: "#DADADA" }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <BookOnlineIcon
                            sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
                        />
                        <Link to="/" style={textLink}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", md: "flex" },
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                LOGO/BookITech
                            </Typography>
                        </Link>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none" },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
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
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {
                                        xs: "block",
                                        md: "none",
                                    },
                                }}
                            >
                                {pagesLog.map((page) => {
                                    if (userr || window.localStorage.getItem("user")) {
                                        if (page !== "SignUp" && page !== "SignIn") {
                                            return (
                                                <MenuItem
                                                    key={page}
                                                    onClick={handleCloseNavMenu}
                                                >
                                                    <Link to={`/${page}`} style={textLink}>
                                                        <Typography textAlign="center">
                                                            {page}
                                                        </Typography>
                                                    </Link>
                                                </MenuItem>
                                            )
                                        }
                                    } else {
                                        if (page !== "Favorites" && page !== "Profile") {
                                            return (
                                                <MenuItem
                                                    key={page}
                                                    onClick={handleCloseNavMenu}
                                                >
                                                    <Link to={`/${page}`} style={textLink}>
                                                        <Typography textAlign="center">
                                                            {page}
                                                        </Typography>
                                                    </Link>
                                                </MenuItem>
                                            )
                                        }
                                    }
                                })}
                            </Menu>
                        </Box>
                        <AdbIcon
                            sx={{
                                display: { xs: "flex", md: "none" },
                                mr: 1,
                            }}
                        />
                        <Link to="/" style={textLink}>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { xs: "flex", md: "none" },
                                    flexGrow: 1,
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                LOGO
                            </Typography>
                        </Link>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            {pagesLog.map((page) => {
                                if (userr || window.localStorage.getItem("user")) {
                                    if (page !== "SignUp" && page !== "SignIn") {
                                        return (
                                            <Button
                                                key={page}
                                                onClick={handleCloseNavMenu}
                                                sx={{
                                                    my: 2,
                                                    color: "white",
                                                    display: "block",
                                                }}
                                            >
                                                <Link to={`/${page}`} style={textLink}>
                                                    {page}
                                                </Link>
                                            </Button>
                                        )
                                    }
                                } else {
                                    if (page !== "Favorites" && page !== "Profile") {
                                        return (
                                            <Button
                                                key={page}
                                                onClick={handleCloseNavMenu}
                                                sx={{
                                                    my: 2,
                                                    color: "white",
                                                    display: "block",
                                                }}
                                            >
                                                <Link to={`/${page}`} style={textLink}>
                                                    {page}
                                                </Link>
                                            </Button>
                                        )
                                    }
                                }
                            })}
                        </Box>
                        <Search />
                        <CartShopping />
                        {
                            userr || window.localStorage.getItem("user") ?
                            <>
                            <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        alt="Avatar"
                                        src="https://getavataaars.com/?avatarStyle=Circle&clotheType=CollarSweater&eyeType=Hearts&eyebrowType=SadConcerned&facialHairType=MoustacheFancy&mouthType=Vomit&skinColor=Pale&topType=NoHair"
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
                                {/* {settings.map((setting) => ( */}
                                    <MenuItem
                                        // key={setting}
                                        onClick={handleCloseUserMenu}
                                    >
                                    <Link to="/profile" style={textLink2}>
                                    <Typography textAlign="center">
                                            Profile
                                        </Typography>
                                    </Link>
                                    </MenuItem>
                                    <MenuItem
                                    onClick={handleCloseUserMenu}
                                    >
                                    <Link to="/" style={textLink2} onClick={() => handleLogout()}>
                                        <Typography textAlign="center">
                                            Logout
                                        </Typography>
                                    </Link>
                                    </MenuItem>
                                {/* ))} */}
                            </Menu>
                        </Box>
                            </>
                            :
                            <>
                                <h1> </h1>
                            </>
                        }
                        
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default NavBar;
