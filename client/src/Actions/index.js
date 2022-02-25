 import axios from 'axios';

 export function getVideogames(){
     
     return async function(dispatch){
         var allVideogames = await axios.get('http://localhost:3001/videogames');
         const videogamesCreated = allVideogames.data.filter(el => el.createInDB);
         const videogamesApi = allVideogames.data.filter(el => !el.createInDB);

         for(let i = 0; i < videogamesCreated.length; i++){
            for(let j = 0; j < videogamesCreated[i].genres.length; j++){
                var genreDeleted = videogamesCreated[i].genres.shift()
                videogamesCreated[i].genres.push(genreDeleted.name)
            }
        }

        const videogamesTotalCleaned = videogamesApi.concat(videogamesCreated)

         return dispatch({
             type: 'GET_VIDEOGAMES',
             payload: videogamesTotalCleaned
         })

     }
 }

 export function getPlatforms(){

    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/platforms');

        return dispatch({
            type: 'GET_PLATFORMS',
            payload: json.data
        })
    }
 }

 export function getVideogamesName(name){

    return async function(dispatch){
        try {
            var json = await axios.get('http://localhost:3001/videogames?name=' + name);
            return dispatch({
                type: 'GET_VIDEOGAMES_NAME',
                payload: json.data
            })
        } catch (error) {
            alert('Not an existing game')
        }
    }
 }

 export function getGenres(){

    return async function(dispatch){
        
            var info = await axios.get('http://localhost:3001/genres');
            return dispatch({
                type: 'GET_GENRES',
                payload: info.data
            })
    }
 }

 export function getDetails(id){
     return async function(dispatch){
         try {
            let json = await axios.get('http://localhost:3001/videogames/' + id)

            let videogameCleaned = [json.data]
             
            return dispatch({
                type: 'GET_DETAILS',
                payload: videogameCleaned
            })

         } catch (error) {
             console.log(error)
         }
     }
 }

 export function clearDetailsState(payload){
     return{
         type: 'CLEAR_DETAILS_STATE',
         payload
     } 
 }

 export function postVideogame(payload){
     return async function(dispatch){
         const response = await axios.post('http://localhost:3001/videogame', payload)
         return response
     }
 }

 export function filterVideogamesByGenre(payload){
     return {
         type: 'FILTER_BY_GENRE',
         payload
     }
 }

 export function filterCreated(payload){
     return{
         type: 'FILTER_CREATED',
         payload
     }
 }

 export function orderByName(payload){
     return{
         type: 'ORDER_BY_NAME',
         payload
     }
 }

 export function orderByRating(payload){
     return{
         type: 'ORDER_BY_RATING',
         payload
     }
 }

