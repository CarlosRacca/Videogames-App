import React, {useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, clearDetailsState } from "../Actions";
import styles from '../Components/Details.module.css';

export default function Detail(){
    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(()=>{
        dispatch(getDetails(id))
        return ()=>{
            dispatch(clearDetailsState())
        }
    }, [dispatch])

    const myVideogame = useSelector((state)=> state.details)

    return (
        <div className={styles.div}>
            <Link to='/videogames'>
                <button className={styles.button}>Go back</button>
            </Link>
            {
                myVideogame.length > 0 ? 
                <div className={styles.data}>
                    <img className={styles.img} src={myVideogame[0].img} alt='Imagen no encontrada' width='900px' height='700px'></img>
                    <h1 className={styles.name}>"{myVideogame[0].name}"</h1>
                    <h3>Release Date: {myVideogame[0].releaseDate}</h3>
                    <h3>Rating: {myVideogame[0].rating}</h3>
                    <h3>Genres: {myVideogame[0].genres.map(el => `"${el}"  `)}</h3>
                    <h3>Platforms: {myVideogame[0].platforms.map(el => `"${el}" `)}</h3>
                    <h3>Description: {myVideogame[0].description}</h3>
                    
                </div> :
                <p className={styles.loading}>Loading...</p>
            }
            <p className={styles.empty}></p>
        </div>
    )
}