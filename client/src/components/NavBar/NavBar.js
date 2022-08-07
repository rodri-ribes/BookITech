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
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/features/data/dataSlice';
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/index'

function NavBar({ user, setUser }) {
    const [click, setClick] = useState({});

    const changeClick = () => {
        setClick(!click);
    };

    let userr = useSelector(state => state.data.user)
    let dispatch = useDispatch()


    const logOut = () => {
        signOut(auth)
    }

    const handleLogout = async () => {
        window.localStorage.removeItem("user")
        dispatch(getUser(null))
        try {
            await logOut()
        } catch (error) {
            console.log(error)
        }
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
                        {userr || window.localStorage.getItem("user") ?

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