import React from "react";
import styles from '../Components/Card.module.css';

export default function Card({name, genres, img}){
    return(
        <main  className={styles.main}>
            <div>
                <h3 className={styles.name}>{name}</h3>
                <h5 className={styles.genres}>{genres}</h5>
                <img src={img} alt='Not found!' width='300px' height='250px' className={styles.img}/>
            </div>
        </main>
    )
}