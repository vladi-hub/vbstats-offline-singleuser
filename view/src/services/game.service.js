import * as Constants from "../components/constants";

class GameDataService {
  
  getAllPerUser(userId) {
    var team = localStorage.getItem("games");
    if (!team){
      return null;
    }
    return team;
    /*var data = {
      "lastId": "3",
      "games": [
          {
              "id": "1",
              "name": "Little Big South Game 1"
          },
          {
              "id": "2",
              "name": "December_15_game"
          },
          {
              "id": "3",
              "name": "Game 37"
          }
      ]
  };
      return JSON.stringify(data);*/
  }

  create(data) {
    var games = localStorage.getItem("games");
    if(!games){
      games = {
       lastId: 0,
       games: [] // Add the empty array field
     };
    } else {
      games = JSON.parse(games);
    }
    var nextId = games.lastId + 1;
    var newGame = { "id": nextId, "name": data['name']  }
    games.games.push(newGame);
    games.lastId = nextId;
    localStorage.setItem("games", JSON.stringify(games));
    return nextId;
  }

  update(gameId, data) {
    var games = JSON.parse(localStorage.getItem("games"));
    const itemToUpdate = games.games.find(item => item.id === parseInt(gameId));
    // Update the element
    if (itemToUpdate) {
      itemToUpdate.name = data['name'];
      localStorage.setItem("games", JSON.stringify(games));
    }
  }

  delete(gameId) {
    var games = JSON.parse(localStorage.getItem("games"));
    
    games.games.forEach((value, index) => {
      if(value.id == parseInt(gameId)){
        games.games.splice(index,1);
        localStorage.setItem("games", JSON.stringify(games));
      }
    });
  }

}

export default new GameDataService();