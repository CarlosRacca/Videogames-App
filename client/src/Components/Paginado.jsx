import React from "react";
import styles from '../Components/Paginado.module.css';


export default function Paginado({videogamesPerPage, allVideogames, paginado}){
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <nav className={styles.paginado}>
            <ul className='paginado'>
                { pageNumbers?.map(number => {
                    return (
                    <label className='number' key={number} className={styles.label}>
                        <a onClick={() => paginado(number)} className={styles.number}>{number}</a> 
                    </label>
                    )
                })}
            </ul>
        </nav>
    )
}