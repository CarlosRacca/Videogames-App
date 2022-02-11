import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames, getGenres, filterVideogamesByGenre, filterCreated, orderByName, orderByRating } from "../Actions";
import {Link} from 'react-router-dom';
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from '../Components/Home.module.css';


export default function Home(){

    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    const genres = useSelector((state) => state.genres)
    const [orden , setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(()=>{
        dispatch(getVideogames());
        dispatch(getGenres())

    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
        
    }

    function handleFilterGenre(e){
        dispatch(filterVideogamesByGenre(e.target.value))
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    function handleOrderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleOrderByRating(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return(
        <div className={styles.divHome}>
            <div className={styles.divCreate}>
                <Link to='/videogame' className={styles.createVG}>Create your own videogame</Link>
            </div>
            <h1 className={styles.title}>Homepage Videogames</h1>
            <button onClick={e => {handleClick(e)}} className={styles.buttonReset}>Reset</button>
            <div>
                <div className={styles.divFiltersTotal}>
                    <div className={styles.divFilters}>
                        <select onChange={e => handleOrderByName(e)} className={styles.select1}>
                            <option>Order alphabetically</option>
                            <option value= 'asc'>A to Z</option>
                            <option value= 'desc'>Z to A</option>
                        </select>
                        <select onChange={e => handleOrderByRating(e)} className={styles.select2}>
                            <option>Order by Rating</option>
                            <option value= 'mayor'>High to Low</option>
                            <option value= 'menor'>Low to High</option>
                        </select>
                        <select onChange={e => handleFilterGenre(e)} className={styles.select3}>
                            <option value='all' key='all'>All</option>
                        {genres?.map(el => {
                                return(
                                <option value={el.name} key={el.id}>{el.name}</option>
                            )})}
                        </select>
                        <select onChange={e => handleFilterCreated(e)} className={styles.select4}>
                            <option value='all'>All</option> 
                            <option value='api'>Existing</option> 
                            <option value='created'>Created</option>
                        </select>
                        <SearchBar/>
                    </div>
                </div>
                <Paginado videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} paginado={paginado}/>
                
                {
                    currentVideogames?.map( el => {
                        return(
                            <div className={styles.divCard} key={el.id}>
                            <Link to={`/videogames/${el.id}`}>
                                <Card name={el.name} img={el.img} genres={el.genres.map(el => `${el}  `)}></Card>
                            </Link>
                        </div>
                        )
                    })
                }
                <Paginado videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} paginado={paginado}/>
            </div>
        </div>
    )
}