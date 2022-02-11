

const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    details: [],
    platforms: []
}

function rootReducer(state = initialState, action){
    switch(action.type){
        default:
            return state;

        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            };

        case 'GET_PLATFORMS':
            return {
                ...state,
                platforms: action.payload
            };

        case 'FILTER_BY_GENRE':
            const allVideogames = state.allVideogames;    

            const genreFiltered = action.payload === 'all' ? allVideogames : allVideogames.filter(el => el.genres[0] === action.payload || el.genres[1] === action.payload || el.genres[2] === action.payload || el.genres[3] === action.payload || el.genres[4] === action.payload || el.genres[5] === action.payload || el.genres[6] === action.payload )
            return{
                ...state,
                videogames: genreFiltered
            }
            
        
        case 'FILTER_CREATED':
            const createdFilter = action.payload === 'created' ? state.allVideogames.filter(el => el.createInDB) : state.allVideogames.filter(el => !el.createInDB)
            return{
                ...state,
                videogames: action.payload === 'all' ? state.allVideogames : createdFilter
            }

        case 'ORDER_BY_NAME':
            const sortArr = action.payload === 'asc' ? state.videogames.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1
                }
                if(a.name.toLowerCase() < b.name.toLowerCase()){
                    return -1
                }
                return 0
            }) :
            state.videogames.sort(function (a, b) {
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return -1
                }
                if(a.name.toLowerCase() < b.name.toLowerCase()){
                    return 1
                }
                return 0
            })
            return{
                ...state,
                videogames: sortArr
            }
        
        case 'ORDER_BY_RATING':
            const orderedArr = action.payload === 'mayor' ? state.videogames.sort(function(a, b){
                if(a.rating > b.rating){
                    return -1
                }
                else if(a.rating < b.rating){
                    return 1
                }
                return 0
            }) :
            state.videogames.sort(function (a, b){
                if(a.rating > b.rating){
                    return 1
                }
                else if(a.rating < b.rating){
                    return -1
                }
                return 0
            })
            return{
                ...state,
                videogames: orderedArr
            }
            
        case 'POST_VIDEOGAME':
            return {
                ...state
            }

        case 'GET_VIDEOGAMES_NAME':
            return{
                ...state,
                videogames: action.payload
            }

        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload
                // genres: [{name: 'carlitos', id: 1}, {name: 'juan', id: 2}]
            }

        case 'GET_DETAILS':
            return{
                ...state,
                details: action.payload
            }

        case 'CLEAR_DETAILS_STATE':
            return{
                ...state,
                details: []
            }
    }
}

export default rootReducer