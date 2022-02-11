import React from "react";
import {Link} from 'react-router-dom';
import styles from '../Components/LandingPage.module.css';

export default function LandingPage(){
    return(
        <div className={styles.LandingPage}>
        <div className={styles.div}>
            <h1 className={styles.title}>Welcome to the World of Videogames!</h1>
            
                <Link to='/videogames'>
                    <button className={styles.button}>Enter</button>
                </Link>
            </div>
        </div>
    )
}