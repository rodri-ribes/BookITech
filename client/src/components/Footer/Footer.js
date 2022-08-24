import style from "./Footer.module.css";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";


const textLink = {
    textDecoration: "none",
    color: "#DADADA",
    fontFamily:"monospace"
};

function Footer() {
    return (
        <>
            <footer className={style.FooterContainer}>
                <div className={style.Container}>
                    <div className={style.Terms}>
                        <p>&copy;{new Date().getFullYear()} BookITech</p>
                    </div>
                    <div className={style.Social}>
                        <Link to="/about" style={textLink}>
                            <Typography sx={{fontFamily: "monospace", fontSize: "2rem", mr:5}}>
                                About
                            </Typography>
                        </Link>
                        <div>
                            <a
                                href="https://github.com/rodri-ribes/PF-Libros"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaGithub className={style.Icono} />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
