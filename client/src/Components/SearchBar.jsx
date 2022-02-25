import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesName } from "../Actions";
import styles from '../Components/SearchBar.module.css';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)        
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getVideogamesName(name))
        setName('')
    }

    return (
        <div>
            <input value={name} type= 'text' placeholder= 'Search...' onChange={e => handleInputChange(e)}/>
            <button type='submit' onClick={e => handleSubmit(e)} onSubmit={e => handleSubmit(e)} className={styles.button}>Search</button>
        </div>
    )
}