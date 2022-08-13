import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardBook from "../Home/CardBook/CardBook";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Avatar, ButtonBase, Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import styles from "./Profile.module.css";
import { getDataUser } from "../../redux/features/data/dataSlice";

function Profile() {

  let dispatch = useDispatch()
  let User = useSelector(state => state.data.dataUser)

  // let User = useSelector((state) => state.data.user);
  let Favs = useSelector((state) => state.data.Favs);
  var favLength = Favs.length;
  var leftConstraints = favLength * -100;
  const [expanded, setExpanded] = useState(false);
  // let user = window.localStorage.getItem("user")
  let userId = JSON.parse(window.localStorage.getItem("user"))
  useEffect(() => {
    dispatch(getDataUser(userId.id))
  }, [dispatch])
  

  // const rating = User.rating
  // const ratingAvg = function(rating) {
  //   let i = 0, summ = 0, ArrayLen = myArray.length;
  //   while (i < ArrayLen) {
  //       summ = summ + rating[i++];
  // }
  //   return summ / ArrayLen;
  // }


  const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    borderColor: 'text.primary',
    width: '30rem',
    height: '1px',
  };
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  
  
  // const Img = styled('img')({
    //   margin: 'auto',
    //   display: 'block',
    //   maxWidth: '100%',
    //   maxHeight: '100%',
    // });
    // console.log(JSON.parse(usuario));
    console.log(userId.id);
// console.log(window.localStorage.getItem("user").id);
console.log(User);
  return (
    <div className={styles.cont}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Grid container spacing={8}>
          <Grid item>
            <ButtonBase>
              <Avatar
                alt="avatar"
                src={User.img || "https://avataaars.io/?avatarStyle=Circle&topType=Eyepatch&facialHairType=BeardMagestic&clotheType=BlazerShirt&eyeType=WinkWacky&eyebrowType=RaisedExcitedNatural&mouthType=Serious&skinColor=Tanned"}
                sx={{ width: 250, height: 250 }}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                {/* <Typography gutterBottom variant="subtitle1" component="div"> */}
                <Stack direction="row" spacing={1}>
                  <IconButton
                    aria-label="edit"
                    sx={{
                      color: "#DADADA",
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                    <h1>{User.fullName}</h1>
                </Stack>
                <br />
                {/* </Typography> */}
                <Stack direction="row" spacing={1}>
                  <IconButton
                    aria-label="edit"
                    sx={{
                      color: "#DADADA",
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {User.email}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <IconButton
                    aria-label="edit"
                    sx={{
                      color: "#DADADA",
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {(User.name) ? User.name : "Name" }
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <IconButton
                    aria-label="edit"
                    sx={{
                      color: "#DADADA",
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {(User.lastname) ? User.lastname : "Lastname" }
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                <IconButton
                  aria-label="edit"
                  sx={{
                    color: "#DADADA",
                  }}
                >
                  <EditIcon />
                </IconButton>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {(User.address) ? User.address : "Address" }
                </Typography>
                </Stack>
                <br />
                <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                  <Box sx={{ ...commonStyles, borderTop: 1 }} />
                </Box>
                <br />
                <Typography gutterBottom variant="subtitle1" component="div">
                  Rating (4.5 avg)
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {User.comments.length} reviews
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {User.email.length} favorites
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {User.email.length} readed books
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Joined in {User.email.length}
                </Typography>
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
            {/* <Typography
              sx={{
                backgroundColor: "#0f243b",
                color: "#DADADA",
              }}
            >
              check all your purchases
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: "#0f243b",
              color: "#DADADA",
            }}
          >
            <Typography>
              Shopping data shopping data data shopping data shopping data
              shopping data shopping data shopping data shopping data shopping
              data shopping data shopping data shopping data
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
            {/* <Typography
              sx={{
                backgroundColor: "#0f243b",
                color: "#DADADA",
              }}
            >
              your reviews history
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: "#0f243b",
              color: "#DADADA",
            }}
          >
            <Typography>
              Reviews reviews reviews reviews reviews reviews reviews
            </Typography>
          </AccordionDetails>
        </Accordion>
        {/* <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Advanced settings
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
        {/* <Grid item xs={5} sm={3} > */}
        {/* </Grid> */}
        {/* <Grid container spacing={3}> */}
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
                  dragConstraints={{ right: 0, left: leftConstraints }}
                >
                  {Favs.map((l, i) => {
                    return (
                      <motion.div className={styles.carouselItem}>
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
                  dragConstraints={{ right: 0, left: leftConstraints }}
                >
                  {Favs.map((l, i) => {
                    return (
                      <motion.div className={styles.carouselItem}>
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
    </div>
  );
}

export default Profile;
{
  /* </Grid> */
}
