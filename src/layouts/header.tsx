import { useState } from "react";
import logoinacio from "../assets/img/logo.png"
import styles from "./header.module.css"
export default function HeaderNav(){
    const [isActive, setIsActive] = useState(false);
    const handleClick = () => {
        setIsActive((prevIsActive) => !prevIsActive);
        console.log(styles.mobileMenu)
    }
    return(
        <nav id="menu">
            <img src={logoinacio} alt="Inácio Filho" id={styles.logo}/>
            <div className={isActive ? `${styles.mobileMenu} ${styles.active}` : `${styles.mobileMenu}`} onClick={handleClick}>
                <div className={styles.line1}></div>
                <div className={styles.line2}></div>
                <div className={styles.line3}></div>
            </div>
            <ul id={styles.links} className={isActive ? `${styles.active}` : ``}>
                <li><a className={styles.nav} href="./index.html">HOME</a></li>
                <li><a className={styles.nav} href="./index.html">SOBRE</a></li>
                <li><a className={styles.nav} href="./index.html">PROJETOS</a></li>
                <li><a className={styles.nav} href="./index.html">CONTATO</a></li>
            </ul>
        </nav>
    )
}