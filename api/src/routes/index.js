const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Videogame, Genre} = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl1 = await axios.get(`https://api.rawg.io/api/games?key=db5d960df49c48e7a2b0ac6dbb92505f&page_size=40&page=1`)
    const apiUrl2 = await axios.get(`https://api.rawg.io/api/games?key=db5d960df49c48e7a2b0ac6dbb92505f&page_size=40&page=2`)
    const apiUrl3 = await axios.get(`https://api.rawg.io/api/games?key=db5d960df49c48e7a2b0ac6dbb92505f&page_size=40&page=3`)
    
    let data1 = apiUrl1.data.results
    let data2 = apiUrl2.data.results
    let data3 = apiUrl3.data.results

    let totalApiInfo = [...data1, ...data2,...data3];

    const apiInfo = await totalApiInfo.map(el => {
        return {
            id: el.id,
            name: el.name,
            description: el.description,
            releaseDate: el.released,
            platforms: el.platforms.map(el => el.platform.name),
            rating: el.rating,
            img: el.background_image,
            genres: el.genres.map(el => el.name)
        }
    })
    return apiInfo
}

const getDbInfo = async () => {
    return await Videogame.findAll({
        include:{
            model: Genre,
            attributes: ['name'],
            through:{
                attributes: []
            }
        }
    })
}

const getAllVideogames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

router.get('/', async(req, res) => {
    let videogamesTotal = await getAllVideogames();
    res.status(200).send(videogamesTotal)
})

router.get('/videogames', async(req, res) => {
    const name = req.query.name;
    let videogamesTotal = await getAllVideogames();
    if(name){
        const videogameName = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=db5d960df49c48e7a2b0ac6dbb92505f`)
        const videogameSearchedInfo = await videogameName.data.results.map(el => {
            return{
                id: el.id,
                name: el.name,
                description: el.description,
                releaseDate: el.released,
                platforms: el.platforms.map(el => el.platform.name),
                rating: el.rating,
                img: el.background_image,
                genres: el.genres.map(el => el.name)

            }
        })

        const videogameNameDb = await videogamesTotal.filter(el => el.name.toLowerCase().includes(name.toLocaleLowerCase()))
        const totalSearch = [...videogameSearchedInfo, ...videogameNameDb]
        totalSearch.length ?
        res.status(200).send(totalSearch) :
        res.status(404).send('No esta el juego')
    }
    else{
        res.status(200).send(videogamesTotal)
    }
})

router.get('/platforms', async(req, res) => {
    const platforms = await getAllVideogames();
    const platformsApi = platforms.map(el => el.platforms.map(el => el))

    const allPlatforms = [];

    for(let i = 0; i < platformsApi.length; i++){
        for(let j = 0; j < platformsApi[i].length; j++){
            allPlatforms.push(platformsApi[i][j])
        }
    }

    allPlatforms.sort()

    const allPlatformsCleaned = []
    
    for(let i = 0; i < allPlatforms.length; i++){
        if(allPlatforms[i] !== allPlatforms[i + 1]){
            allPlatformsCleaned.push(allPlatforms[i])
        }
    }

    res.send(allPlatformsCleaned)

})



router.get("/videogames/:id", async (req, res) => {
    const id = req.params.id;
    if(id.length > 8){
        try{
            let videogamesTotal = await getAllVideogames();
            let videogameCreated = await videogamesTotal.filter(el => el.id === id)
        
            videogameCreated.length ?
            res.status(200).send(videogameCreated[0]) :
            res.status(404).send('No esta el juego')

        }
        catch(err){
            res.status(200).send(err)
        }
    ;}  
    let game = await axios.get(`https://api.rawg.io/api/games/${id}?key=db5d960df49c48e7a2b0ac6dbb92505f`)
    let gameId = game.data
    let gameIdDetails = {
            id: gameId.id,
            name: gameId.name,
            description: gameId.description_raw,
            releaseDate: gameId.released,
            platforms: gameId.platforms.map(el => el.platform.name),
            rating: gameId.rating,
            img: gameId.background_image,
            genres: gameId.genres.map(el => el.name)

    }
    res.status(200).send(gameIdDetails)
      });
    
  

router.get('/genres', async(req, res) => {
    const genreApi = await axios.get(`https://api.rawg.io/api/genres?key=db5d960df49c48e7a2b0ac6dbb92505f`)
    const genreApiName = genreApi.data.results.map(el => el.name)
    
    genreApiName.forEach(el => {
        Genre.findOrCreate({
            where: {name: el}
        })
    })
    const allGenres = await Genre.findAll();
    res.send(allGenres)
})

router.post('/videogame', async (req, res) => {
    let {name, releaseDate, platforms, rating, img, genre, description,createInDB} = req.body;

    try {
        
        let videogameCreated = await Videogame.create({
            name, releaseDate, platforms, rating, img, genre, description, createInDB
        })
        
        let genreDb = await Genre.findAll({
            where: {name: genre}
        })

        videogameCreated.addGenre(genreDb)
        
        res.status(200).send(videogameCreated)   
    } catch (error) {
        res.status(404).send(error)
    }
})
                   
module.exports = router;
                        