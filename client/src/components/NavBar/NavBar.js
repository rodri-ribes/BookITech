import React, { useState } from 'react';
import {
    NavbarContainer,
    NavbarWrapper,
    Menu,
    MenuItem,
    MenuItemLink,
    IconLogoMovile,
    IconLogo,
} from './NavBar.elements';
import {
    FaBars,
    FaTimes,
    FaUserAlt,
    FaBriefcase,
    FaEnvelope,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Search from '../Search/Search';

function NavBar() {
    const [click, setClick] = useState(false);

    const changeClick = () => {
        setClick(!click);
    };
    return (
        <>
            <NavbarContainer>
                <NavbarWrapper>
                    <IconLogo>PF-LIBROS</IconLogo>
                    <Search />
                    <IconLogoMovile onClick={() => changeClick()}>
                        {click ? <FaTimes /> : <FaBars />}
                    </IconLogoMovile>
                    <Menu click={click}>
                        <MenuItem onClick={() => changeClick()}>
                            <MenuItemLink>
                                <div>
                                    <FaUserAlt />
                                    <NavLink to="/about">ABOUT</NavLink>
                                </div>
                            </MenuItemLink>
                        </MenuItem>
                        <MenuItem onClick={() => changeClick()}>
                            <MenuItemLink>
                                <div>
                                    <FaBriefcase />
                                    <NavLink to="/about">ABOUT</NavLink>
                                </div>
                            </MenuItemLink>
                        </MenuItem>
                        <MenuItem onClick={() => changeClick()}>
                            <MenuItemLink>
                                <div>
                                    <FaEnvelope />
                                    <NavLink to="/about">ABOUT</NavLink>
                                </div>
                            </MenuItemLink>
                        </MenuItem>
                    </Menu>
                </NavbarWrapper>
            </NavbarContainer>
        </>
    );
}

export default NavBar;
