import * as Constants from "../components/constants";

class GameDataService {
  
  getAllPerUser(userId) {
    var team = localStorage.getItem("games");
    if (team == null){
      return {0:"Test"};
    }
    return JSON.stringify(team);
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
     var nextId = games.lastId + 1;
     var newGame = { "id": nextId, "name": data['name']  }
     games.games.push(newGame);
     localStorage.setItem("games", games);
     return nextId;
  }

  update(gameId, data) {
    var games = localStorage.getItem("games");
    const itemToUpdate = games.games.find(item => item.id === gameId);
    // Update the element
    if (itemToUpdate) {
      itemToUpdate.name = data['name'];
    }
    localStorage.setItem("games", games);
    return JSON.stringify(itemToUpdate);
  }

  delete(gameId) {
    var games = localStorage.getItem("games");
    
    games.games.forEach((value, index) => {
      if(value.id == gameId){
        games.games.splice(index,1);
      }
    });
  }

}

export default new GameDataService();