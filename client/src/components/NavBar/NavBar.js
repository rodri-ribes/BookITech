import React, { useState } from 'react';
import {
    NavbarContainer,
    NavbarWrapper,
    Menu,
    MenuItem,
    MenuItemLink,
    IconLogoMovile,
    IconLogo,
    ContainerSearch,
} from './NavBar.elements';
import {
    FaBars,
    FaTimes,
} from 'react-icons/fa';

import { GoSignIn } from 'react-icons/go'
import { RiLogoutBoxFill } from 'react-icons/ri'
import { BsHeartFill } from 'react-icons/bs'

import { NavLink } from 'react-router-dom';
import Search from '../Search/Search';
import CartShopping from '../CartShopping/CartShopping';

function NavBar() {
    const [click, setClick] = useState(false);

    const changeClick = () => {
        setClick(!click);
    };

    const handleLogout = () => {
        window.localStorage.removeItem("user")
    }

    return (
        <>
            <NavbarContainer>
                <NavbarWrapper>
                    <IconLogoMovile onClick={() => changeClick()}>
                        {click ? <FaTimes /> : <FaBars />}
                    </IconLogoMovile>
                    <IconLogo>
                        <NavLink to="/" className="navlink">
                            PF-BOOKS
                        </NavLink>
                    </IconLogo>
                    <ContainerSearch>
                        <>
                            <Search />
                        </>
                    </ContainerSearch>
                    <Menu click={click}>
                        {window.localStorage.getItem("user") ?
                            <>
                                <MenuItem onClick={() => changeClick()}>
                                    <MenuItemLink>
                                        <div>
                                            <BsHeartFill />
                                            <NavLink to="/favorites">FAVORITES</NavLink>
                                        </div>
                                    </MenuItemLink>
                                </MenuItem>
                                <MenuItem onClick={() => changeClick()}>
                                    <MenuItemLink>
                                        <div>
                                            <RiLogoutBoxFill />
                                            <NavLink to="/" onClick={() => handleLogout()}>LOGOUT</NavLink>
                                        </div>
                                    </MenuItemLink>
                                </MenuItem>
                            </>
                            :
                            <>
                                <MenuItem onClick={() => changeClick()}>
                                    <MenuItemLink>
                                        <div>
                                            <GoSignIn />
                                            <NavLink to="/signin">SIGN IN</NavLink>
                                        </div>
                                    </MenuItemLink>
                                </MenuItem>
                                <MenuItem onClick={() => changeClick()}>
                                    <MenuItemLink>
                                        <div>
                                            <GoSignIn />
                                            <NavLink to="/signup">SIGN UP</NavLink>
                                        </div>
                                    </MenuItemLink>
                                </MenuItem>
                            </>
                        }
                    </Menu>
                    <CartShopping />
                </NavbarWrapper>
            </NavbarContainer>
        </>
    );
}

export default NavBar;