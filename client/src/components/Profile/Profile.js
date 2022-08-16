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
import { updateUserdata } from "../../redux/features/data/dataSlice";
import axios from "axios";
import Spinner from "../auxiliar/Spinner/Spinner";
const { REACT_APP_API } = process.env;

function Profile() {
    let dispatch = useDispatch();
    let Favs = useSelector((state) => state.data.Favs);
    var favLength = Favs.length;
    var leftConstraints = favLength * -100;
    const [expanded, setExpanded] = useState(false);

    const [User, setUser] = useState(false);

    const [updateData, setUpdateData] = useState();
    const [modalUpdate, setModalUpdate] = useState(false);
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
    console.log(userId);

    const getdata = async () => {
        let userId = JSON.parse(window.localStorage.getItem("user"));
        try {
            let data = await axios.get(REACT_APP_API + `/user/${userId.id}`);
            setUser(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getdata();
    });

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    // const rating = User.rating
    // const ratingAvg = function(rating) {
    //   let i = 0, summ = 0, ArrayLen = myArray.length;
    //   while (i < ArrayLen) {
    //       summ = summ + rating[i++];
    // }
    //   return summ / ArrayLen;
    // }

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

    const cleaner = () => {
        setFieldSelected("");
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
        console.log(updateData);
        openCloseModal();
        dispatch(updateUserdata(User._id, fieldSelected));
    };
    console.log(User.id);

    const openCloseModal = () => {
        setModalUpdate(!modalUpdate);
        cleaner();
    };

    const modalStyles = {
        position: "absolute",
        width: 400,
        backgroundColor: "#0f243b",
        color: "#DADADA",
        border: "2px solid #000",
        // boxShadow: theme.shadow[5],
        padding: (2, 4, 3),
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    };
    console.log(User.img);

    const iconosStyles = {
        cursor: "pointer",
    };

    const inputMaterialStyles = {
        width: "100%",
        color: "#DADADA",
    };

    const bodyUpdate = (
        <Grid sx={modalStyles}>
            <TextField
                sx={inputMaterialStyles}
                label="Username"
                name="fullName"
                onChange={(e) => handleChange2(e)}
                value={fieldSelected && fieldSelected.fullName}
            />
            <TextField
                sx={inputMaterialStyles}
                label="email"
                name="email"
                onChange={(e) => handleChange2(e)}
                value={fieldSelected && fieldSelected.email}
            />
            <TextField
                sx={inputMaterialStyles}
                label="avatar"
                name="img"
                onChange={(e) => handleChange2(e)}
                value={fieldSelected && fieldSelected.img}
            />
            <TextField
                sx={inputMaterialStyles}
                label="Name"
                name="realName"
                onChange={(e) => handleChange2(e)}
                value={fieldSelected && fieldSelected.realName}
            />
            <TextField
                sx={inputMaterialStyles}
                label="Lastname"
                name="lastname"
                onChange={(e) => handleChange2(e)}
                value={fieldSelected && fieldSelected.lastname}
            />
            <TextField
                sx={inputMaterialStyles}
                label="phone"
                name="phone"
                onChange={(e) => handleChange2(e)}
                value={fieldSelected && fieldSelected.phone}
            />
            <TextField
                sx={inputMaterialStyles}
                label="address"
                name="address"
                onChange={(e) => handleChange2(e)}
                value={fieldSelected && fieldSelected.address}
            />
            <br />
            <div align="right">
                <Button color="primary" onClick={() => pushNewData()}>
                    update
                </Button>
                <Button color="primary" onClick={() => openCloseModal()}>
                    cancel
                </Button>
            </div>
        </Grid>
    );
    // if (!User.length) return
    return (
        <div className={styles.cont}>
            <CssBaseline />
            {User ? (
                <Container maxWidth="xl">
                    <Grid container spacing={8}>
                        <Grid item>
                            <br /> <br />
                            {/* <ButtonBase> */}
                            <Avatar
                                alt="avatar"
                                src={
                                    User.img ||
                                    "https://avataaars.io/?avatarStyle=Circle&topType=Eyepatch&facialHairType=BeardMagestic&clotheType=BlazerShirt&eyeType=WinkWacky&eyebrowType=RaisedExcitedNatural&mouthType=Serious&skinColor=Tanned"
                                }
                                sx={{ width: 250, height: 250 }}
                            />
                            {/* </ButtonBase> */}
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
                                                        }}
                                                    >
                                                        {User.fullName}
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
                                                        }}
                                                    >
                                                        <h2>{User.email}</h2>
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            color: "#DADADA",
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
                                                        }}
                                                    >
                                                        {/* <EditIcon
                                                            sx={iconosStyles}
                                                        /> */}
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
                                    <Typography
                                        sx={{
                                            color: "#DADADA",
                                            fontSize: "2rem",
                                        }}
                                        gutterBottom
                                        variant="subtitle1"
                                        component="div"
                                    >
                                        Rating (0 avg)
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#DADADA",
                                            fontSize: "2rem",
                                        }}
                                        gutterBottom
                                        variant="subtitle1"
                                        component="div"
                                    >
                                        {User.comments?.length} reviews
                                    </Typography>
                                    {/* <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                            component="div"
                                        >
                                            {User.email.length} favorites
                                        </Typography> */}
                                    {/* <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                            component="div"
                                        >
                                            {User.email.length} readed books
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Joined in {User.email.length}
                                        </Typography> */}
                                </Grid>
                            </Grid>
                        </Grid>

                        <Modal
                            open={modalUpdate}
                            // onClose={openCloseModal()}
                        >
                            {bodyUpdate}
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
                            }}
                        >
                            <Typography sx={{ width: "33%", flexShrink: 0 }}>
                                <h2>Shopping history</h2>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                backgroundColor: "#0f243b",
                                color: "#DADADA",
                            }}
                        >
                            <Typography>Nothing here</Typography>
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
                            <Typography sx={{ width: "33%", flexShrink: 0 }}>
                                <h2>Reviews</h2>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                backgroundColor: "#0f243b",
                                color: "#DADADA",
                            }}
                        >
                            <Typography>
                                Dare to write your review about the books you
                                have read!
                            </Typography>
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
                            <Typography sx={{ width: "33%", flexShrink: 0 }}>
                                <h2>Favorites</h2>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                backgroundColor: "#0f243b",
                                color: "#DADADA",
                            }}
                        >
                            <Typography>
                                <motion.div className={styles.carousel}>
                                    <motion.div
                                        className={styles.containerItem}
                                        drag="x"
                                        dragConstraints={{
                                            right: 0,
                                            left: leftConstraints,
                                        }}
                                    >
                                        {Favs.map((l, i) => {
                                            return (
                                                <motion.div
                                                    className={
                                                        styles.carouselItem
                                                    }
                                                >
                                                    <CardBook
                                                        name={l.title}
                                                        id={l.isbn13}
                                                        authors={l.authors}
                                                        img={l.image}
                                                        key={i}
                                                    />
                                                </motion.div>
                                            );
                                        })}
                                    </motion.div>
                                </motion.div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    {/* <Accordion
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
                            <Typography sx={{ width: "33%", flexShrink: 0 }}>
                                Readed books
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                backgroundColor: "#0f243b",
                                color: "#DADADA",
                            }}
                        >
                            <Typography>
                                <motion.div className={styles.carousel}>
                                    <motion.div
                                        className={styles.containerItem}
                                        drag="x"
                                        dragConstraints={{
                                            right: 0,
                                            left: leftConstraints,
                                        }}
                                    >
                                        {Favs.map((l, i) => {
                                            return (
                                                <motion.div
                                                    className={styles.carouselItem}
                                                >
                                                    <CardBook
                                                        name={l.title}
                                                        id={l.isbn13}
                                                        authors={l.authors}
                                                        img={l.image}
                                                        key={i}
                                                    />
                                                </motion.div>
                                            );
                                        })}
                                    </motion.div>
                                </motion.div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion> */}
                </Container>
            ) : (
                <Spinner />
            )}
        </div>
    );
}

export default Profile;
