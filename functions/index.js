const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");


var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>1");
app.use(function(req, res, next) {
	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>2");
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Content-type", "application/json");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
    next();
});

const {
    addGame,
    getGame,
    updateGame,
    deleteGame
} = require('./APIs/game')


const {
    addPlayer,
    getPlayer,
    updatePlayer,
    deletePlayer
} = require('./APIs/player')

const {
    addStats,
    getStats,
    updateStats,
    updatePlayerName,
    deleteStats,
    deleteAllStatsPerGame
} = require('./APIs/stats')

// Users
//app.post('/login', loginUser);
//app.post('/signup', signUpUser);
//app.post('/user/reset', auth, passwordReset);
//app.post('/user/forgot',passwordForgot);

//Stats
app.get('/stats/:gameId', auth, getStats);
app.post('/stats', auth, addStats);
app.put('/stats/:statsId', auth, updateStats);
app.put('/stats/playername/:playerId', auth, updatePlayerName);
app.delete('/stats/:statsId',auth, deleteStats);
app.delete('/stats/all/:gameId',auth, deleteAllStatsPerGame);
//Game
//Digging
app.get('/game/:userId', auth, getGame);
app.post('/game', auth, addGame);
app.put('/game/:gameId', auth, updateGame);
app.delete('/game/:gameId',auth, deleteGame);

//Player
app.get('/player/all/:userId', auth, getPlayer);
app.post('/player', auth, addPlayer);
app.put('/player/:playerId', auth, updatePlayer);
app.delete('/player/:playerId',auth, deletePlayer);

exports.api = functions.https.onRequest(app);