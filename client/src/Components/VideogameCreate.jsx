import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {postVideogame, getGenres, getPlatforms} from '../Actions'
import { useDispatch, useSelector } from "react-redux";
import styles from '../Components/VideogameCreate.module.css';


function validate(input){
    let errors = {};
    if(!input.name.match(/^[A-Za-z0-9_\s]+$/)){
        errors.name = 'A valid name is required, you must use only alphanumerics characters';
    }
    else if(!input.releaseDate){
        errors.releaseDate = 'A release date is required'
    }
    else if(input.rating > 5 || input.rating < 0){
        errors.rating = 'You must enter a number from 1 to 5'
    }
    else if(!input.img){
        errors.img = 'An image is required'
    }
    else if(!input.description){
        errors.description = 'A description must be added'
    }
    
    return errors
}


export default function VideogameCreate(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const genres = useSelector(state => state.genres)
    const platforms = useSelector(state => state.platforms)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: '',
        releaseDate: '',
        platforms: [],
        rating: '',
        img: '',
        genre: [],
        description: ''
    })

    
    function handleClick(e){
        if(input.name.length === 0){
            alert('Complete the name before creating the game')
        }
        else if(input.releaseDate.length === 0){
            alert('Complete the release date before creating the game')
        }
        else if(input.platforms.length === 0){
            alert('Add the platforms before creating the game')
        }
        else if(input.rating.length === 0){
            alert('add the rating before creating the game')
        }
        else if(input.img.length === 0){
            alert('Add an image before creating the game')
        }
        else if(input.genre.length === 0){
            alert('Add the genres before creating the game')
        }
        else if(input.description.length === 0){
            alert('Complete a description before creating the game')
        }
        
        else{
        e.preventDefault();
        dispatch(postVideogame(input))
        alert('The game has been created!')
        setInput({
            name: '',
            releaseDate: '',
            platforms: [],
            rating: '',
            img: '',
            genre: [],
            description: ''
        })
        navigate('/videogames')}
    }

    function handleDelete(e){
        e.preventDefault();
        setInput({
            ...input,
            genre: input.genre.filter(el => el !== e.target.name)
        })
    }

    function handleDeletePlatforms(e){
        e.preventDefault();
        setInput({
            ...input,
            platforms: input.platforms.filter(el => el !== e.target.name)
        })
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e){
        if(input.genre.length === 0){
            setInput({
                ...input,
                genre: [...input.genre, e.target.value]
            })
        }
        for(let i =0; i < input.genre.length; i++){
            if(input.genre[i] === e.target.value){
                return(
                    alert(`The genre "${e.target.value}" is already selected`)
                )
            }
            else
            {
                setInput({
                    ...input,
                    genre: [...input.genre, e.target.value]
                })
            }
        }
    }

    function handleSelectPlatforms(e){
        if(input.platforms.length === 0){
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
        }
        for(let i =0; i < input.platforms.length; i++){
            if(input.platforms[i] === e.target.value){
                return(
                    alert(`The platform "${e.target.value}" has already been selected`)
                )
            }
            else
            {
                setInput({
                    ...input,
                    platforms: [...input.platforms, e.target.value]
                })
            }
        }
    }

    useEffect(()=> {
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [dispatch])


    return(
        <div className={styles.div}>
            <Link to='/videogames'><button className={styles.buttonBack}>GO BACK</button></Link>
            <h1 className={styles.title}>Create your videogame!</h1>
            <form className={styles.form}>
                <div className={styles.labels}>
                    <label>Name:</label>
                    <input type='text' value={input.name} placeholder='E.g: "Lionel Messi"' name='name' onChange={e => handleChange(e)} className={styles.input} />
                </div>
                    {errors.name && (
                        <p className={styles.errors}>{errors.name}</p>
                    )}               
                <div className={styles.labels}>
                    <label>Release Date:</label>
                    <input type='text' value={input.releaseDate} placeholder='E.g: "14-09-1995"' name='releaseDate' onChange={e => handleChange(e)} className={styles.input}/> 
                </div>
                    {errors.releaseDate && (
                        <p className={styles.errors}>{errors.releaseDate}</p>
                    )}              
                <div className={styles.labels}>
                    <label>Rating:</label>
                    <input type='text' value={input.rating} placeholder='E.g: "3.9"' name='rating' onChange={e => handleChange(e)} className={styles.input} /> 
                </div>
                    {errors.rating && (
                        <p className={styles.errors}>{errors.rating}</p>
                    )}              
                <div className={styles.labels}>
                    <label>Image:</label>
                    <input type='text' value={input.img} placeholder='E.g: "LioMessi.jpeg"' name='img' onChange={e => handleChange(e)}  className={styles.input}/>  
                </div>
                    {errors.img && (
                        <p className={styles.errors}>{errors.img}</p>
                    )}             
                <div className={styles.labels}>
                    <label>Description:</label>
                    <input type='text' value={input.description} placeholder='E.g: "G.O.A.T"' name='description' onChange={e => handleChange(e)} className={styles.input}/>
                </div>
                    {errors.description && (
                        <p className={styles.errors}>{errors.description}</p>
                    )}   
                <div >
                    <label className={styles.labels}>Platforms: 
                        <select onChange={e => handleSelectPlatforms(e)}>
                            {platforms?.map(el => {
                                return (
                                    <option value={el} key={input.platforms.indexOf(el)}>{el}</option>
                                )
                            })}
                        </select>
                    </label>
                </div>    
                <div className={styles.labels}>Selected Platforms:
                    {
                        input.platforms.map((el) => {
                        return (
                            <label  key={input.platforms.indexOf(el)}>
                                {'  ' + el}
                                <button className={styles.buttonX} name={el} onClick={e => handleDeletePlatforms(e)}>X</button>
                            </label>
                        )})}
                    
                </div>        
                <label className={styles.labels}>Genres:
                <select onChange={e => handleSelect(e)}>
                    {genres?.map(el => {
                        return(
                        <option value={el.name} key={el.id}>{el.name}</option>
                    )})}
                </select>
                </label>
                <div className={styles.labels}>Selected Genres:
                    {
                        input.genre.map((el) => {
                        return (
                            <label  key={input.genre.indexOf(el)}>
                                {'  ' + el}
                                <button className={styles.buttonX} name={el} onClick={e => handleDelete(e)}>X</button>
                            </label>
                        )})}
                    
                </div>
            </form>
            <button className={styles.buttonCreate} type='submit' onClick={e => handleClick(e)}>Create Videogame</button>
        </div>
    )
}