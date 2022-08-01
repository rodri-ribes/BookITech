import style from "./Footer.module.css"
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { BsFillBriefcaseFill } from "react-icons/bs";



function Footer() {
    return (
        <>
            <footer className={style.FooterContainer}>
                <div className={style.Container}>
                    <div className={style.Terms}>
                        <p>&copy;{new Date().getFullYear()} PF-LIBROS</p>
                    </div>
                    <div className={style.Social}>
                        <div>
                            <a href="https://github.com/rodri-ribes/PF-Libros" target="_blank" rel="noreferrer">
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