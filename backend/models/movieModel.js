let mongoose = require('mongoose');


let MovieSchema = mongoose.Schema({
    "_id":Number,
    "Title":String,
    "Year":Number,
    "Genre":Array,
    "Runtime":Number,
    "Director":String,
    "Plot":String,
    "Poster":String,
    "Votes":Number,
    "Actors":String,
    "imdbID":String,
    "Type":String,
    "Released":Date,
    "DateString":String
}, { collection : 'Movies' });

module.exports = mongoose.model('Movie', MovieSchema);