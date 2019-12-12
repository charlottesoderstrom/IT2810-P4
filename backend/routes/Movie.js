let express = require('express')
let cors = require('cors')
let router = express.Router();
let Movie = require('../models/movieModel.js')


// Wanted results in every request. It will be +1 with a "Result" element telling the amount of results.
const perPage = 9

//  Search can be done by;
// - Title searche and genre spesifications
// - Only title searche
// - Only genre spesifications
// - None, requesting all results
//   
//   PS: Every result will be sorted by either Date, Votes or Title

sortMethod = (sortParameter) => {
    if (sortParameter === "date"){
        return {Released:-1}
    }else if(sortParameter === "vote"){
        return {Votes:-1}
    }else {
        return {Title:1}
    }}
        


//Get results with search string, spesific genre(s) and page
router.get("/f/:sort/title=:title&genre=:genre&page=:page",async (req, res) => {
    try {
        let searchText = req.params.title.replace(("+"),(" "))
        let genreSearch = req.params.genre.split("+")
        let count = await Movie.countDocuments( { $text: { $search: searchText, $caseSensitive:false}, Genre : { $all : genreSearch }})
        let movies = await  Movie.find( { $text: { $search: searchText, $caseSensitive:false}, Genre : { $all : genreSearch }})
                                    .sort(sortMethod(req.params.sort))
                                    .skip((parseInt((req.params.page)*perPage)))
                                    .limit(perPage);
        movies.push({"Results": count})
        res.status(200).json(movies);
    } catch (error) {
        res.status(400).json({message:err});
    }
});



//Get movies containing a string in Title where start and end tells range. In the end of the result json, you will find 
// the amout of movies with the result
// Result is sorted by relevance in contrary to the other that is sorted by title
router.get("/:sort/title=:title&page=:page",async (req, res) => {
    try {
    
        let sortMethod = req.params.sort!=="date"? {$score: { $meta: "textScore"}} : {Released:-1}
        let searchText = req.params.title.replace(("+"),(" "))
        let count = await Movie.countDocuments({ $text: { $search: searchText, $caseSensitive:false}});
        let movies = await  Movie.find( { $text: { $search: searchText, $caseSensitive:false}}, { $score: { $meta: "textScore"}})
                                    .sort(sortMethod)
                                    .skip((parseInt((req.params.page)*perPage)))
                                    .limit(perPage);
        movies.push({"Results": count})
        res.status(200).json(movies);
    } catch (err) {
        res.status(400).json({message:err});
 }
});

//find({ $text: { $search: "harry Potter"}}, { $score: { $meta: "textScore"}}).sort( {$score: { $meta: "textScore"}})
// Get all movies containing a genre 
router.get("/genreIntersect=:genre&page=:page",async (req, res) => {
    try {
        let genreSearch = req.params.genre.split("+")
        let count = await Movie.countDocuments({Genre : { $all : genreSearch }})
        let movies = await Movie.find({Genre : { $all : genreSearch }})
                                .sort(sortMethod(req.params.sort)) 
                                .skip((parseInt((req.params.page)*perPage)))
                                .limit(perPage);
        movies.push({"Results": count})
        res.status(200).json(movies);
        }
    catch (error) {
        res.status(400).json({message:err});
    }
});


//Get all movies containing a genre (Union search ==> Action and Drama ==> Movies with action, or drama, or both)
router.get("/:sort/genres=:genres&page=:page",async (req, res) => {
    let genreSearch = req.params.genres.split("+")
    let count = await Movie.countDocuments({ $or:[ {'Genre': { $in : genreSearch}}] })
    Movie.find( { $or:[ {'Genre': { $in : genreSearch}}] })
    .sort(sortMethod(req.params.sort))
    .skip(((parseInt(req.params.page))*perPage))
    .limit(perPage)
    .then(docs => {
        docs.push({"Results": count})
        res.send(docs);
    })
    .catch((err) => res.status(400).json(err))
});


//Get all movies in DB FULL data
router.get("/:sort/all&page=:page",cors(),async (req, res) => {
    try {
        let count = await Movie.countDocuments();
        let  movies = await Movie.find()
                                .sort(sortMethod(req.params.sort))
                                .skip((parseInt(req.params.page))*perPage)
                                .limit(perPage);
        movies.push({"Results": count})
        res.json(movies);
    } catch (error) {
        res.json({message:err});
    }
});


//Return a spesific movie from MongoDB with _id 
router.get("/id=:MovieID",cors(),async (req, res) => {
    try {
        let fetchingMovie = await Movie.findById(req.params.MovieID)
        res.json(fetchingMovie);
    } catch (error) {
        res.json({message:err});
    }
});

//Get all movies in DB, but less data (representative)
// router.get("/?lessAll&start=:start&end=:end",cors(),async (req, res) => {
//     try {
//         console.log(req.params)
//         let  movies = await Movie.find({},{"_id" : 1, "Title":1, "Plot":1})
//             .sort("Title")
//             .skip(parseInt(req.params.start))
//             .limit(parseInt(req.params.end));
//         res.json(movies);
//     } catch (error) {
//         res.json({message:err});
//     }
// });

//Get all unice Genres
router.get("/genres",cors(), async (req, res) => {
    try {
        let fetchingMovie = await Movie.find().distinct(("Genre"));
        res.status(200).json(fetchingMovie);
        }
    catch (error) {
        res.status(400).json({message:err});
    }
});


// POST an up- or downvote
router.post('/vote/id=:id&vote=:vote', async function(req, res) {
    let id = parseInt(req.params.id)
    let vote = (req.params.vote)==="up" ? 1:-1;
    try{
        let movie = await Movie.findById(id)
        await Movie.updateOne(
            { "_id": id },
            {
              $set: {"Votes" : movie.Votes+vote}
            }
          );
        res.status(200).send({Movie:movie.Title, Vote: vote, CurrentVotes: (movie.Votes+vote), Status: "OK"})
    }catch(error){
         res.status(400).send({Movie:id, Vote: vote,CurrentVotes: (movie.Votes+vote), Status: "NOT OK"})
    }
});

//genreCounter
//Get all unice Genres
router.get("/genresCount",cors(), async (req, res) => {
    try {
        genreCount = []
        let movieGenres = await Movie.find().distinct(("Genre"));
        for (let genre of movieGenres){
            let value = await Movie.countDocuments( {'Genre': { $in : genre}})
            genreCount.push({'text':genre, 'value':value})
        }
        res.json(genreCount)
        
    }catch (error) {
        res.status(400).json({message:err});
    }
});

module.exports = router; 