require('dotenv').config();
const express = require('express');
const app = express();

const sequelize = require('./src/connection/mySqlDatabaseConnection.js');
const Catalog = require('./src/models/catalog.js');
const Category = require('./src/models/category.js');
const Actor = require('./src/models/actor.js');
const Genre = require('./src/models/genre.js');
const MovieGenre = require('./src/models/moviegenre.js');
const CatalogView = require('./src/views/catalogView.js');

const { Op } = require('sequelize');
const PORT = process.env.PORT || 3000;
const baseURL = 'http://localhost:' + PORT;

app.use(express.json());

console.log("Servidor abierto");

let server = app.listen(PORT, () => {
    console.log('Listening', server.address().port)
  });


/////////////////GET CATEGORIES/////////////////
app.get('/categories', async (req,res) => {
    try{
        await sequelize.authenticate();
        console.log('Conexión exitosa a la base de datos.');

        await Category.sync();

        const categories = await Category.findAll();

        if (!categories || categories.length === 0){
            return res.status(200).json(`No categories found!`);
        }

        return res.status(200).json(categories);

    } catch (error) {
        return res.status(500).json({ error: 'Error en el servidor',
                                description: error.message});
    }
})

/////////////////GET GENRES/////////////////
app.get('/genres', async (req,res) => {
    try{
        await sequelize.authenticate();
        console.log('Conexión exitosa a la base de datos.');

        await Genre.sync();

        const genres = await Genre.findAll();

        if (!genres || genres.length === 0){
            return res.status(200).json(`No genres found!`);
        }

        return res.status(200).json(genres);

    } catch (error) {
        return res.status(500).json({ error: 'Error en el servidor',
                                description: error.message});
    }
})

/////////////////GET FULL CATALOG/////////////////
app.get('/catalog', async (req, res) => {
    try {
      await sequelize.authenticate();
      console.log('Conexión exitosa a la base de datos.');

      await CatalogView.sync();
  
      const allCatalog = await CatalogView.findAll();

      if (allCatalog.length > 0) {
        const allCatalogData = allCatalog.map(catalog => catalog.dataValues);

        const updatedCatalog = getUpdatedCatalogWithAbsoluteRoute(allCatalogData);

        return res.status(200).json(updatedCatalog);
      } else {
        return res.status(200).json('No movies found!');
      }
  
    } catch (error) {
      return res.status(500).json({
        error: 'Error en el servidor',
        description: error.message
      });
    }
  });
  

/////////////////GET MOVIE BY ID/////////////////
app.get('/catalog/id/:id', async (req,res) => {
    try{
        await sequelize.authenticate();
        console.log('Conexión exitosa a la base de datos.');

        await CatalogView.sync();

        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json(`Invalid ID '${id}'!`);
        }
        
        const catalog = await CatalogView.findByPk(id);

        if (catalog) {
            const updatedCatalog = getUpdatedCatalogWithAbsoluteRoute(catalog);
            return res.status(200).json(updatedCatalog);
        }   
        else {
            return res.status(200).json(`No movie found with ID '${id}'!`);
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error en el servidor',
                                description: error.message});
    }
})

/////////////////GET MOVIE BY NAME/////////////////
app.get('/catalog/name/:name', async (req,res) => {
    try{
        await sequelize.authenticate();
        console.log('Conexión exitosa a la base de datos.');

        await CatalogView.sync();

        const movieName = req.params.name;
        const nameCopy = movieName;

        if (nameCopy.length === 0 || nameCopy.trim().length === 0) {
            return res.status(400).json('No name was provided!');
        }

        const catalog = await CatalogView.findAll({ where: { title: {[Op.like]: `%${movieName}%` }}});

        if (catalog.length > 0) {
            const updatedCatalog = getUpdatedCatalogWithAbsoluteRoute(catalog);
            return res.status(200).json(updatedCatalog);
        }   
        else {
            return res.status(200).json(`No movies found with name or partial name '${movieName}'!`);
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error en el servidor',
                                description: error.message});
    }
})

/////////////////GET MOVIES BY GENRE/////////////////
app.get('/catalog/genre/:genre', async (req,res) => {
    try{
        await sequelize.authenticate();
        console.log('Conexión exitosa a la base de datos.');

        await Genre.sync();
        await MovieGenre.sync();
        await CatalogView.sync();
        
        const genreName = req.params.genre;
        
        const nameCopy = genreName;

        if (nameCopy.length === 0 || nameCopy.trim().length === 0) {
            return res.status(400).json('No genre was provided!');
        }

        const genre = await Genre.findOne({ where: { genreName: {[Op.like]: `%${genreName}%` }}});

        if (!genre) {
            return res.status(200).json(`Genre '${genreName}' is inexistent!`);
        }

        const genreID = genre.genreID;

        const movieGenreIDs = await MovieGenre.findAll({ where: { genreID: genreID }});
        
        if (movieGenreIDs.length === 0) {
            return res.status(200).json(`No movies found with genre '${genreName}'!`);
        }

        const moviesIDs = [];

        for(let movie of movieGenreIDs){
            moviesIDs.push(movie.movieID);
        }
        const catalog = [];
        
        for(let movieID of moviesIDs){
            const movie = await CatalogView.findOne({ where: { movieID: movieID}});

            if (movie){
                catalog.push(movie);
            }            
        }
        
        const updatedCatalog = getUpdatedCatalogWithAbsoluteRoute(catalog);
        return res.status(200).json(updatedCatalog);

        // if (movies) {
        //     res.status(200).json(movies);
        // }   
        // else {
        //     res.status(200).json('No movie found with that name!');
        // }
    } catch (error) {
        return res.status(500).json({ error: 'Error en el servidor',
                                description: error.message});
    }
})

/////////////////GET MOVIES BY CATEGORY/////////////////
app.get('/catalog/category/:category', async (req,res) => {
    try{
        await sequelize.authenticate();
        console.log('Conexión exitosa a la base de datos.');

        await Category.sync();
        await CatalogView.sync();

        const categoryName = req.params.category;
        
        const nameCopy = categoryName;

        if (nameCopy.length === 0 || nameCopy.trim().length === 0) {
            return res.status(400).json('No category was provided!');
        }

        const category = await Category.findOne({ where: { categoryName: {[Op.like]: `%${categoryName}%` }}});

        if (!category){
            return res.status(200).json(`Category '${categoryName}' is inexistent!`);
        }

        const catalog = await CatalogView.findAll({ where: { category: categoryName }});

        if (catalog.length === 0) {
            return res.status(200).json(`No movies found with category '${categoryName}'!`);
        }

        const updatedCatalog = getUpdatedCatalogWithAbsoluteRoute(catalog);
        return res.status(200).json(updatedCatalog);

        // if (movies) {
        //     return res.status(200).json(movies);
        // }   
        // else {
        //     return res.status(200).json('No movie found with that name!');
        // }
    } catch (error) {
        return res.status(500).json({ error: 'Error en el servidor',
                                description: error.message});
    }
})

/////////////////RUTAS INEXISTENTES/////////////////
app.get("*", (req, res) => {
    res.status(404).send("Lo sentimos, la página que buscas no existe.");
  });

function getUpdatedCatalogWithAbsoluteRoute(originalCatalog) {
    return updatedCatalog = originalCatalog.map(catalog => ({
        ...catalog,
        poster: baseURL + catalog.poster
      }));
}