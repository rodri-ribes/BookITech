import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardBook from "../Home/CardBook/CardBook";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {
    Avatar,
    ButtonBase,
    Grid,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    Modal,
    Button,
    TextField,
    TableBody,
    Box,
    Table,
} from "@mui/material";
import styled from "@emotion/styled";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import styles from "./Profile.module.css";
import GradeIcon from '@mui/icons-material/Grade';
import {
    updateUserdata,
    UpdatePass,
    getFav,
} from "../../redux/features/data/dataSlice";
import axios from "axios";
import Spinner from "../auxiliar/Spinner/Spinner";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
const { REACT_APP_API } = process.env;

function Profile() {
    let dispatch = useDispatch();
    let Favo = useSelector((state) => state.data.Favo);
    let Favorites = Favo?.map((l) => l.book);
    var favLength = Favo.length;
    var leftConstraints = favLength * -100;
    const [expanded, setExpanded] = useState(false);

    const [User, setUser] = useState(false);
    const [text, setText] = useState("");

    const [updateData, setUpdateData] = useState();
    const [passChange, setPassChange] = useState();
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalUpdatePass, setModalUpdatePass] = useState(false);
    const [pass, setPass] = useState({
        current: "",
        password: "",
    });
    const [fieldSelected, setFieldSelected] = useState({
        fullName: "",
        email: "",
        img: "",
        realName: "",
        lastname: "",
        phone: "",
        address: "",
    });
    let userId = JSON.parse(window.localStorage.getItem("user"));
    console.log(User);
    
    const getdata = async () => {
        let userId = JSON.parse(window.localStorage.getItem("user"));
        console.log(userId);
        try {
            let data = await axios.get(REACT_APP_API + `/user/${userId.id}`);
            console.log(data.data);
            setUser(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const idUser = () => {
        if (window.localStorage.getItem("user")) {
            let auxUser = JSON.parse(window.localStorage.getItem("user"));
            let idUser = auxUser?.email;
            dispatch(getFav(idUser));
        }
    };

    useEffect(() => {
        getdata();
        idUser();
    }, [updateData]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };



    // const commonStyles = {
    //   bgcolor: 'background.paper',
    //   m: 1,
    //   borderColor: 'text.primary',
    //   width: '30rem',
    //   height: '1px',
    // };

    // const Img = styled('img')({
    //   margin: 'auto',
    //   display: 'block',
    //   maxWidth: '100%',
    //   maxHeight: '100%',
    // });

    const handleChange2 = (e) => {
        const { name, value } = e.target;
        setFieldSelected((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleChangePass = (e) => {
        const { name, value } = e.target;
        setPass((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const cleaner = () => {
        setFieldSelected("");
        setPass("");
    };

    const pushNewData = () => {
        setUpdateData((prevState) => ({
            ...prevState,
            fullName: fieldSelected.fullName,
            email: fieldSelected.email,
            img: fieldSelected.img,
            realName: fieldSelected.realName,
            lastname: fieldSelected.lastname,
            phone: fieldSelected.phone,
            address: fieldSelected.address,
        }));
        openCloseModal();
        dispatch(updateUserdata(User._id, fieldSelected));
    };
    const pushNewPass = () => {
        setPassChange((prevState) => ({
            ...prevState,
            current: pass.current,
            password: pass.password,
        }));
        openCloseModalPass();
        dispatch(UpdatePass(User._id, pass));
    };

    const openCloseModal = () => {
        setModalUpdate(!modalUpdate);
        cleaner();
    };
    const openCloseModalPass = () => {
        setModalUpdatePass(!modalUpdatePass);
        cleaner();
    };

    const modalStyles = {
        position: "absolute",
        width: 400,
        backgroundColor: "#0a1929",
        opacity: "90%",
        color: "#DADADA",
        border: "2px solid #000",
        // boxShadow: theme.shadow[5],
        padding: (2, 4, 3),
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "2%",
    };

    const iconosStyles = {
        cursor: "pointer",
    };

    const cssTextField = {
        width: "100%",
        mb: 1.5,
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

    let [boole, setBoole] = useState(true);
    var validEmail =
        /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let validate = () => {
        if (validEmail.test(text)) {
            setBoole(true);
        } else {
            setBoole(false);
        }
    };
    // validate()

    console.log(User);

    const bodyUpdate = (
        <Grid sx={modalStyles}>
            <Box component="form" noValidate>
                <TextField
                    id="custom-css-outlined-input"
                    sx={cssTextField}
                    label="Username"
                    name="fullName"
                    onChange={(e) => handleChange2(e)}
                    value={fieldSelected && fieldSelected.fullName}
                />
                <TextField
                    sx={cssTextField}
                    label="Email"
                    name="email"
                    onChange={(e) => handleChange2(e)}
                    value={fieldSelected && fieldSelected.email}
                />
                <TextField
                    sx={cssTextField}
                    label="Avatar"
                    name="img"
                    onChange={(e) => handleChange2(e)}
                    value={fieldSelected && fieldSelected.img}
                />
                <TextField
                    sx={cssTextField}
                    label="Name"
                    name="realName"
                    // error={boole}
                    // helperText={boole === false ? "ERRORRRR" : ""}
                    onChange={(e) => handleChange2(e)}
                    value={fieldSelected && fieldSelected.realName}
                />
                <TextField
                    sx={cssTextField}
                    label="Lastname"
                    name="lastname"
                    onChange={(e) => handleChange2(e)}
                    value={fieldSelected && fieldSelected.lastname}
                />
                <TextField
                    sx={cssTextField}
                    label="Phone"
                    name="phone"
                    onChange={(e) => handleChange2(e)}
                    value={fieldSelected && fieldSelected.phone}
                />
                <TextField
                    sx={cssTextField}
                    label="Address"
                    name="address"
                    onChange={(e) => handleChange2(e)}
                    value={fieldSelected && fieldSelected.address}
                />
            </Box>

            <br />
            <div align="right">
                <Button
                    // disabled={boole === false}
                    color="primary"
                    onClick={() => pushNewData()}
                >
                    update
                </Button>
                <Button color="primary" onClick={() => openCloseModal()}>
                    cancel
                </Button>
            </div>
        </Grid>
    );
    const bodyUpdatePass = (
        <Grid sx={modalStyles}>
            <Box component="form" noValidate>
                <TextField
                    type="password"
                    id="custom-css-outlined-input"
                    sx={cssTextField}
                    label="Password"
                    name="current"
                    onChange={(e) => handleChangePass(e)}
                    value={pass && pass.current}
                />
                <TextField
                    type="password"
                    id="custom-css-outlined-input"
                    sx={cssTextField}
                    label="New Password"
                    name="password"
                    onChange={(e) => handleChangePass(e)}
                    value={pass && pass.password}
                />
            </Box>

            <br />
            <div align="right">
                <Button color="primary" onClick={() => pushNewPass()}>
                    update
                </Button>
                <Button color="primary" onClick={() => openCloseModalPass()}>
                    cancel
                </Button>
            </div>
        </Grid>
    );

    let ratings = User.reviews?.map(r => r.rating)
    let ratingSum = ratings?.reduce((r, t) => {
        return  t+r},0)
    let ratingAvg = ratingSum / ratings?.length


    
    // console.log(JSON.parse(window.localStorage.getItem("buy")));

    // if (!User.length) return
    return (
        <div className={styles.cont}>
            <CssBaseline />
            {User ? (
                <Container maxWidth="xl">
                    <Grid container spacing={8}>
                        <Grid item>
                            <br /> <br />
                            <ButtonBase>
                                <Avatar
                                    alt="avatar"
                                    src={
                                        User.img ||
                                        "https://avataaars.io/?avatarStyle=Circle&topType=Eyepatch&facialHairType=BeardMagestic&clotheType=BlazerShirt&eyeType=WinkWacky&eyebrowType=RaisedExcitedNatural&mouthType=Serious&skinColor=Tanned"
                                    }
                                    sx={{ width: 250, height: 250 }}
                                />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={8} sm container>
                            <Grid
                                item
                                xs
                                container
                                direction="column"
                                spacing={2}
                            >
                                <Grid item xs>
                                    <br />

                                    <Stack>
                                        <TableContainer>
                                            <TableBody>
                                                <TableRow key={User.id}>
                                                    <TableCell
                                                        sx={{
                                                            color: "#DADADA",
                                                            fontSize: "4rem",
                                                            fontFamily:
                                                                "monospace",
                                                        }}
                                                    >
                                                        {User.fullName ? (
                                                            User.fullName
                                                        ) : (
                                                            <Typography
                                                                sx={{
                                                                    fontSize:
                                                                        "3.3rem",
                                                                    fontFamily:
                                                                        "monospace",
                                                                }}
                                                            >
                                                                Username
                                                            </Typography>
                                                        )}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            color: "#DADADA",
                                                        }}
                                                    >
                                                        <EditIcon
                                                            sx={iconosStyles}
                                                            onClick={() =>
                                                                openCloseModal()
                                                            }
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                            <TableBody>
                                                <TableRow key={User.id}>
                                                    <TableCell
                                                        sx={{
                                                            color: "#DADADA",
                                                            fontFamily:
                                                                "monospace",
                                                        }}
                                                    >
                                                        <h2>{User.email}</h2>
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            color: "#DADADA",
                                                            fontFamily:
                                                                "monospace",
                                                        }}
                                                    >
                                                        {/* <EditIcon
                                                            sx={iconosStyles}
                                                        /> */}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                            <TableBody>
                                                <TableRow key={User.id}>
                                                    <TableCell
                                                        sx={{
                                                            color: "#DADADA",
                                                            fontFamily:
                                                                "monospace",
                                                        }}
                                                    >
                                                        {User.realName ? (
                                                            <h2>
                                                                {User.realName}
                                                            </h2>
                                                        ) : (
                                                            <h2>"Name"</h2>
                                                        )}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            color: "#DADADA",
                                                            fontFamily:
                                                                "monospace",
                                                        }}
                                                    >
                                                        {/* <EditIcon
                                                            sx={iconosStyles}
                                                        /> */}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                            <TableBody>
                                                <TableRow key={User.id}>
                                                    <TableCell
                                                        sx={{
                                                            color: "#DADADA",
                                                            fontFamily:
                                                                "monospace",
                                                        }}
                                                    >
                                                        {User.lastname ? (
                                                            <h2>
                                                                {User.lastname}
                                                            </h2>
                                                        ) : (
                                                            <h2>"Lastname"</h2>
                                                        )}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            color: "#DADADA",
                                                            fontFamily:
                                                                "monospace",
                                                        }}
                                                    >
                                                        {/* <EditIcon
                                                            sx={iconosStyles}
                                                        /> */}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                            <TableBody>
                                                <TableRow key={User.id}>
                                                    <TableCell
                                                        sx={{
                                                            color: "#DADADA",
                                                            fontFamily:
                                                                "monospace",
                                                        }}
                                                    >
                                                        {User.phone ? (
                                                            <h2>
                                                                {User.phone}
                                                            </h2>
                                                        ) : (
                                                            <h2>"Phone"</h2>
                                                        )}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            color: "#DADADA",
                                                            fontFamily:
                                                                "monospace",
                                                        }}
                                                    >
                                                        {/* <EditIcon
                                                            sx={iconosStyles}
                                                        /> */}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                            <TableBody>
                                                <TableRow key={User.id}>
                                                    <TableCell
                                                        sx={{
                                                            color: "#DADADA",
                                                            fontFamily:
                                                                "monospace",
                                                        }}
                                                    >
                                                        {User.address ? (
                                                            <h2>
                                                                {User.address}
                                                            </h2>
                                                        ) : (
                                                            <h2>"Address"</h2>
                                                        )}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            color: "#DADADA",
                                                            fontFamily:
                                                                "monospace",
                                                        }}
                                                    >
                                                        {/* <EditIcon
                                                            sx={iconosStyles}
                                                        /> */}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                            <TableBody>
                                                <TableRow key={User.id}>
                                                    <TableCell
                                                        sx={{
                                                            color: "red",
                                                            fontFamily:
                                                                "monospace",
                                                        }}
                                                    >
                                                        <h2>Update Password</h2>
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            color: "#DADADA",
                                                        }}
                                                    >
                                                        <EditIcon
                                                            sx={iconosStyles}
                                                            onClick={() =>
                                                                openCloseModalPass()
                                                            }
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </TableContainer>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm container>
                            <Grid
                                item
                                xs
                                container
                                direction="column"
                                spacing={2}
                            >
                                <Grid item xs>
                                    <br /> <br />
                                    <Stack display="flex" flexDirection="row">
                                        <Typography
                                            sx={{
                                                color: "#DADADA",
                                                fontSize: "1.7rem",
                                                fontFamily: "monospace",
                                            }}
                                            gutterBottom
                                            variant="subtitle1"
                                            component="div"
                                        >
                                            {ratingAvg ? `avg ${ratingAvg}` : `avg 0`} 
                                        </Typography>
                                        <GradeIcon sx={{color: "yellow", fontSize: "30px", mt:1}} />
                                    </Stack>
                                        <Typography
                                            sx={{
                                                color: "#DADADA",
                                                fontSize: "1.7rem",
                                                fontFamily: "monospace",
                                                mb:4
                                            }}
                                            gutterBottom
                                            variant="subtitle1"
                                            component="div"
                                        >
                                            rating granted
                                        </Typography>
                                    <Typography
                                        sx={{
                                            color: "#DADADA",
                                            fontSize: "1.7rem",
                                            fontFamily: "monospace",
                                        }}
                                        gutterBottom
                                        variant="subtitle1"
                                        component="div"
                                    >
                                        {User.reviews?.length} reviews
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#DADADA",
                                            fontSize: "1.7rem",
                                            fontFamily: "monospace",
                                        }}
                                        gutterBottom
                                        variant="subtitle1"
                                        component="div"
                                    >
                                        {User.comments?.length} comments
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#DADADA",
                                            fontSize: "1.7rem",
                                            fontFamily: "monospace",
                                        }}
                                        gutterBottom
                                        variant="subtitle1"
                                        component="div"
                                    >
                                        {User.buy?.length} purchased books
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#DADADA",
                                            fontSize: "1.7rem",
                                            fontFamily: "monospace",
                                        }}
                                        gutterBottom
                                        variant="subtitle1"
                                        component="div"
                                    >
                                        {Favorites?.length} favorite books
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Modal
                            open={modalUpdate}
                            // onClose={openCloseModal()}
                        >
                            {bodyUpdate}
                        </Modal>
                        <Modal
                            open={modalUpdatePass}
                            // onClose={openCloseModal()}
                        >
                            {bodyUpdatePass}
                        </Modal>
                    </Grid>
                    <br /> <br />
                    <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            sx={{
                                backgroundColor: "#0f243b",
                                color: "#DADADA",
                                fontFamily: "monospace",
                            }}
                        >
                            <Typography
                                noWrap
                                flexGrow={1}
                                sx={{
                                    width: "33%",
                                    flexShrink: 0,
                                    fontFamily: "monospace",
                                }}
                            >
                                <h2>Shopping history</h2>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                backgroundColor: "#0f243b",
                                color: "#DADADA",
                            }}
                        >
                            <TableContainer>
                                <Table
                                    sx={{ minWidth: 650 }}
                                    aria-label="simple table"
                                >
                                    <TableBody>
                                        {User.buy?.map((s) => {
                                            return (
                                                <TableRow
                                                    key={s.isbn13}
                                                    sx={{
                                                        "&:last-child td, &:last-child th":
                                                            { border: 0 },
                                                    }}
                                                >
                                                    <TableCell
                                                        sx={{
                                                            color: "#DADADA",
                                                        }}
                                                        align="left"
                                                    >
                                                        <Link
                                                            to={
                                                                "/book/" +
                                                                s.isbn13
                                                            }
                                                        >
                                                            <img
                                                                src={s.image}
                                                                alt={s.title.replace(
                                                                    s.title[0],
                                                                    s.title[0].toUpperCase()
                                                                )}
                                                                width="100px"
                                                                height="auto"
                                                            />
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            align="left"
                                                            sx={{
                                                                fontSize:
                                                                    "22px",
                                                                color: "#DADADA",
                                                            }}
                                                        >
                                                            {s.title.replace(
                                                                s.title[0],
                                                                s.title[0].toUpperCase()
                                                            )}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            align="left"
                                                            sx={{
                                                                fontSize:
                                                                    "22px",
                                                                color: "#DADADA",
                                                            }}
                                                        >
                                                            x{s.cantidad}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            align="left"
                                                            sx={{
                                                                fontSize:
                                                                    "24px",
                                                                color: "#DADADA",
                                                            }}
                                                        >
                                                            $ {(s.cantidad * s.price?.slice(1)).toFixed(2)}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === "panel2"}
                        onChange={handleChange("panel2")}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                            sx={{
                                backgroundColor: "#0f243b",
                                color: "#DADADA",
                            }}
                        >
                            <Typography
                                noWrap
                                flexGrow={1}
                                sx={{
                                    width: "33%",
                                    flexShrink: 0,
                                    fontFamily: "monospace",
                                }}
                            >
                                <h2>Reviews</h2>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                backgroundColor: "#0f243b",
                                color: "#DADADA",
                            }}
                        >
                            {/* <Typography>
                                Dare to write your review about the books you
                                have read!
                            </Typography> */}
                            <TableContainer>
                                <Table
                                    sx={{ minWidth: 650 }}
                                    aria-label="simple table"
                                >
                                    <TableBody>
                                        {User.reviews?.map((s) => {
                                            return (
                                                <TableRow
                                                    key={s.isbn13}
                                                    sx={{
                                                        "&:last-child td, &:last-child th":
                                                            { border: 0 },
                                                    }}
                                                >
                                                    <TableCell
                                                        sx={{
                                                            color: "#DADADA",
                                                        }}
                                                        align="left"
                                                    >
                                                        <Link
                                                            to={
                                                                "/book/" +
                                                                s.book
                                                            }
                                                        >
                                                            <img
                                                                src={s.bookImg}
                                                                alt={s.bookTitle.replace(
                                                                    s
                                                                        .bookTitle[0],
                                                                    s.bookTitle[0].toUpperCase()
                                                                )}
                                                                width="100px"
                                                                height="auto"
                                                            />
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            align="left"
                                                            sx={{
                                                                fontSize:
                                                                    "22px",
                                                                color: "#DADADA",
                                                            }}
                                                        >
                                                            {s.bookTitle.replace(
                                                                s.bookTitle[0],
                                                                s.bookTitle[0].toUpperCase()
                                                            )}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            align="left"
                                                            sx={{
                                                                fontSize:
                                                                    "22px",
                                                                color: "#DADADA",
                                                            }}
                                                        >
                                                            {`"${s.review}"`}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            align="left"
                                                            sx={{
                                                                fontSize:
                                                                    "30px",
                                                                color: "#DADADA",
                                                            }}
                                                        >
                                                            {`${s.rating}`}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <GradeIcon sx={{ml: -3,fontSize:"35px", color: "yellow"}} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            align="left"
                                                            sx={{
                                                                fontSize:
                                                                    "18px",
                                                                color: "#DADADA",
                                                            }}
                                                        >
                                                            {s.status}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === "panel4"}
                        onChange={handleChange("panel4")}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                            sx={{
                                backgroundColor: "#0f243b",
                                color: "#DADADA",
                            }}
                        >
                            <Typography
                                noWrap
                                flexGrow={1}
                                sx={{
                                    width: "33%",
                                    flexShrink: 0,
                                    fontFamily: "monospace",
                                }}
                            >
                                <h2>Comments</h2>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                backgroundColor: "#0f243b",
                                color: "#DADADA",
                            }}
                        >
                            <TableContainer>
                                <Table
                                    sx={{ minWidth: 650 }}
                                    aria-label="simple table"
                                >
                                    <TableBody>
                                        {User.comments?.map((s) => {
                                            return (
                                                <TableRow
                                                    key={s.isbn13}
                                                    sx={{
                                                        "&:last-child td, &:last-child th":
                                                            { border: 0 },
                                                    }}
                                                >
                                                    <TableCell
                                                        sx={{
                                                            color: "#DADADA",
                                                        }}
                                                        align="left"
                                                    >
                                                        <Link
                                                            to={"/book/" + s.id}
                                                        >
                                                            <img
                                                                src={s.image}
                                                                alt={s.title?.replace(
                                                                    s.title[0],
                                                                    s.title[0].toUpperCase()
                                                                )}
                                                                width="100px"
                                                                height="auto"
                                                            />
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            align="left"
                                                            sx={{
                                                                fontSize:
                                                                    "22px",
                                                                color: "#DADADA",
                                                            }}
                                                        >
                                                            {s.title?.replace(
                                                                s.title[0],
                                                                s.title[0].toUpperCase()
                                                            )}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            align="left"
                                                            sx={{
                                                                fontSize:
                                                                    "22px",
                                                                color: "#DADADA",
                                                            }}
                                                        >
                                                            {`"${s.content}"`}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            align="left"
                                                            sx={{
                                                                fontSize:
                                                                    "18px",
                                                                color: "#DADADA",
                                                            }}
                                                        >
                                                            {s.date}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === "panel3"}
                        onChange={handleChange("panel3")}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                            sx={{
                                backgroundColor: "#0f243b",
                                color: "#DADADA",
                            }}
                        >
                            <Typography
                                noWrap
                                flexGrow={1}
                                sx={{
                                    width: "33%",
                                    flexShrink: 0,
                                    fontFamily: "monospace",
                                }}
                            >
                                <h2>Favorites</h2>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                backgroundColor: "#0f243b",
                                color: "#DADADA",
                            }}
                        >
                            <div className={styles.carruselito}>
                                <Swiper 
                                    // id='main'
                                    modules={[Navigation]}
                                    navigation= {true}
                                    slidesPerView={4}
                                    slidesPerGroup={4}
                                >
                                    
                                        {Favorites?.map((l, i) => {
                                            return (
                                                <SwiperSlide>
                                                    <div className={styles.slide_container}>
                                                        <CardBook
                                                            name={l.title}
                                                            id={l.isbn13}
                                                            authors={l.authors}
                                                            img={l.image}
                                                            price={l.price}
                                                            key={i}
                                                        />
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        })}
                                </Swiper>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </Container>
            ) : (
                <Spinner />
            )}
        </div>
    );
}

export default Profile;
