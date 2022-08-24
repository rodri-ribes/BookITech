import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearch, addFunctionCleans } from "../../redux/features/data/dataSlice";
import { AiOutlineSearch } from "react-icons/ai";
// import style from './Search.module.css';
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { Select } from "@mui/material";

const SearchUI = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "17ch",
            "&:focus": {
                width: "30ch",
            },
        },
    },
}));

export default function Search() {
    const [display, setDisplay] = useState(false);
    const [option, setOption] = useState([]);
    const [name, setName] = useState("");
    const books = useSelector((state) => state.data.allBooks);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    // useEffect(() => {
    //     let titulo = books.map((e) => e.title);
    //     // let autor = books.map((e) => e.authors);
    //     // let obj = titulo.concat(autor);
    //     setOption(titulo);
    // }, [books]);

    const cleanName = (search) =>{
        setName(`${search}`)
    }


    useEffect(()=>{
        dispatch(addFunctionCleans(cleanName))
    },[])

    

    function handleChange2(e) {
        let named = (e.target.value).toLowerCase();
        // console.log(named)
        // console.log(name)
        if(name === ''){
            setName((prevState) =>{
                return prevState + named
            })
            dispatch(getSearch(named))
        return 
        }
        if(name.length < named.length){
            setName((prevState) =>{
                return prevState + named[named.length - 1]
            })
            dispatch(getSearch(named))
            setName(named)
        return
        }
        if(name.length > named.length){
            let diferencia = name.length - named.length
            setName((prevState) =>{
                return prevState.slice(0, -diferencia)
            })
            dispatch(getSearch(named))
        return
        }
    }

    // function redirect() {
    //     if (window.location.pathname !== "/") {
    //         navigate("/");
    //     }
    // }

    // function handleChange(e) {
    //     if (name.length >= 3) {
    //         // setName(e.target.value);
    //         dispatch(getSearch(name));
    //         setDisplay(true);
    //         // setOption(books.map((e) => e.title));
    //     }
    //     console.log(window.location.pathname);
    //     // if (!name) {
    //     // setName(e.target.value);
    //     dispatch(getSearch(name));
    //     if (name.length < 2) {
    //         setDisplay(false);
    //         // setOption([]);
    //     }
    // }

    function handleSubmit(e) {
        e.preventDefault();

        if (window.location.pathname !== '/search') {
            navigate('/search')
            dispatch(getSearch(name))
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={(e) => handleSubmit(e)} >
                <SearchUI>
                    <SearchIconWrapper>
                        <IconButton
                            aria-label="search"
                            color="inherit"
                            sx={{ ml: -2.5, display: { md: "none", xs: "flex" } }}
                        >
                            <SearchIcon />
                        </IconButton>
                        <IconButton
                            aria-label="search"
                            color="inherit"
                            sx={{ display: { md: "flex", xs: "none" } }}
                            pointer= "cursor"
                        >
                            <SearchIcon />
                        </IconButton>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ "aria-label": "search" }}
                        onChange={(e) => handleChange2(e)}
                        // onClick={redirect}
                        type="text"
                        value={name}
                        sx={{
                            flexGrow: 1,
                            display: { md: "flex" },
                        }}
                    />


                    <div>
                        {/* <div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input
                            onChange={(e) => handleChange(e)}
                            type="text"
                            placeholder="Search..."
                            value={name}
                            list="form"
                        />
                        <button type="submit">
                            <AiOutlineSearch />
                        </button>
                    </form>
    <<<<<<< HEAD
                </div> */}
                        {/* <datalist id="form">
                            {display &&
                                option
                                    ?.filter((e) =>
                                        e.toLowerCase().includes(name.toLowerCase())
                                    )
                                    .map((e, k) => {
                                        return (
                                            <option
                                                key={k}
                                                onClick={() => setClick(e)}
                                                value={e}
                                            >
                                                {e}
                                            </option>
                                        );
                                    })}
                        </datalist> */}
                    </div>
                    
                </SearchUI>
            </form>

        </Box>
        // =======
        //             </div>
        //             <datalist className={style.dentro} id="form">
        //                 {display &&
        //                     option
        //                         ?.filter((e) =>
        //                             e.includes(name)
        //                         )
        //                         .map((e, k) => {
        //                             return (
        //                                 <option
        //                                     key={k}
        //                                     onClick={() => setClick(e)}
        //                                     value={e}
        //                                 >
        //                                     {e}
        //                                 </option>
        //                             );
        //                         })}
        //             </datalist>
        //         </div>
        // >>>>>>> Development
    );
}
