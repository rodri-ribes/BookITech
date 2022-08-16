import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardBook from "../Home/CardBook/CardBook";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
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
import { getDataUser, updateUserdata } from "../../redux/features/data/dataSlice";
import axios from "axios"
import Spinner from "../auxiliar/Spinner/Spinner";
const { REACT_APP_API } = process.env


function Profile() {
    let dispatch = useDispatch();
    // let User = useSelector((state) => state.data.dataUser);
    let Favs = useSelector((state) => state.data.Favs);
    var favLength = Favs.length;
    var leftConstraints = favLength * -100;
    const [expanded, setExpanded] = useState(false);

    const [User, setUser] = useState(false)

    const [updateData, setUpdateData] = useState();
    const [modalUpdate, setModalUpdate] = useState(false);
    const [fieldSelected, setFieldSelected] = useState({
        fullName: "",
        img: "",
        phone: "",
        address: "",
    });

    let userId = JSON.parse(window.localStorage.getItem("user"));
    console.log(userId);
    // useEffect(() => {
    //     const getDataUser = async (id) => {
    //         try {
    //             axios.get(REACT_APP_API + `/user/${id}`)
    //                 // console.log(res.data);
    //                 // dispatch(dataUser(res.data));
    //                 .then(res => setUser({ ...res.data }))
    //             //    setUser({...res.data})
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     getDataUser(userId.id)
    //     // dispatch(getDataUser(userId.id));
    //     // algo()
    //     // setUpdateData(User);
    // }, []);

    const getdata = async () => {
        let userId = JSON.parse(window.localStorage.getItem("user"));
        try {
            let data = await axios.get(REACT_APP_API + `/user/${userId.id}`)
            setUser(data.data)
            // getDataUser(data.data)
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getdata()
    }, [])




    //  const updateUserdata = (id, payload) => async (dispatch) => {
    //     try {
    //         console.log(payload);
    //         const res = await axios.put(REACT_APP_API + `/user/${id}`, payload)
    //         dispatch(dataUser(res.data))
    //     } catch (error) {
    //          console.log(error);
    //     }
    // }






    const algo = async function () {
        await dispatch(getDataUser(userId.id))
    }

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

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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

    // var infoUpdated = updateData
    // const newData = infoUpdated.map(data => (
    //   data.fullname = selectField.fullname
    //   data.email = selectField.email
    // ))
    const pushNewData = () => {
        setUpdateData((prevState) => ({
            ...prevState,
            fullName: fieldSelected.fullName,
            email: fieldSelected.email,
        }));
        console.log(updateData);
        openCloseModal();
        dispatch(updateUserdata(User._id, fieldSelected));
        // console.log(fieldSelected);
    };
    console.log(User.id);

    const openCloseModal = () => {
        setModalUpdate(!modalUpdate);
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
                label="img"
                name="img"
                onChange={(e) => handleChange2(e)}
                value={fieldSelected && fieldSelected.img}
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
            {User ?

                <Container maxWidth="xl">
                    <Grid container spacing={8}>
                        <Grid item>
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
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
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
                                                        sx={{ color: "#DADADA" }}
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
                                                        sx={{ color: "#DADADA" }}
                                                    >
                                                        {User.email}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ color: "#DADADA" }}
                                                    >
                                                        <EditIcon
                                                            sx={iconosStyles}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                            <TableBody>
                                                <TableRow key={User.id}>
                                                    <TableCell
                                                        sx={{ color: "#DADADA" }}
                                                    >
                                                        {User.name
                                                            ? User.name
                                                            : "Name"}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ color: "#DADADA" }}
                                                    >
                                                        <EditIcon
                                                            sx={iconosStyles}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                            <TableBody>
                                                <TableRow key={User.id}>
                                                    <TableCell
                                                        sx={{ color: "#DADADA" }}
                                                    >
                                                        {User.lastname
                                                            ? User.lastname
                                                            : "Lastname"}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ color: "#DADADA" }}
                                                    >
                                                        <EditIcon
                                                            sx={iconosStyles}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                            <TableBody>
                                                <TableRow key={User.id}>
                                                    <TableCell
                                                        sx={{ color: "#DADADA" }}
                                                    >
                                                        {User.phone
                                                            ? User.phone
                                                            : "Phone"}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ color: "#DADADA" }}
                                                    >
                                                        <EditIcon
                                                            sx={iconosStyles}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                            <TableBody>
                                                <TableRow key={User.id}>
                                                    <TableCell
                                                        sx={{ color: "#DADADA" }}
                                                    >
                                                        {User.address
                                                            ? User.address
                                                            : "Address"}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ color: "#DADADA" }}
                                                    >
                                                        <EditIcon
                                                            sx={iconosStyles}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </TableContainer>
                                    </Stack>

                                    <br />
                                    <Stack>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                            component="div"
                                        >
                                            Rating (4.5 avg)
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                            component="div"
                                        >
                                            {User.comments?.length} reviews
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                            component="div"
                                        >
                                            {User.email.length} favorites
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                            component="div"
                                        >
                                            {User.email.length} readed books
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Joined in {User.email.length}
                                        </Typography>
                                    </Stack>

                                    <Modal
                                        open={modalUpdate}
                                    // onClose={openCloseModal()}
                                    >
                                        {bodyUpdate}
                                    </Modal>
                                </Grid>
                            </Grid>
                        </Grid>
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
                                Shopping history
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                backgroundColor: "#0f243b",
                                color: "#DADADA",
                            }}
                        >
                            <Typography>
                                Shopping data shopping data data shopping data
                                shopping data shopping data shopping data shopping
                                data shopping data shopping data shopping data
                                shopping data shopping data
                            </Typography>
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
                                Reviews
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                backgroundColor: "#0f243b",
                                color: "#DADADA",
                            }}
                        >
                            <Typography>
                                Reviews reviews reviews reviews reviews reviews
                                reviews
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
                                Favorites
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
                    </Accordion>
                </Container>
                :
                <Spinner />
            }
        </div>
    );
}

export default Profile;
