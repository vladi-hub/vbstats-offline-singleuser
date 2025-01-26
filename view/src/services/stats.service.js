import * as Constants from "../components/constants";

class StatsDataService {
  
  get(gameId) {
    var name = gameId + "_stat";
    var dataStats = localStorage.getItem(name);
    var data = {
      "lastId": "3",
      "players": [
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
      return JSON.stringify(data);
  }

  create(data) {
    var name = data.gameId + "_stat";

    localStorage.setItem(name,data);
    return "";
  }

  update(statsId, data) {
    var name = data.gameId + "_stat";
    return "";
  }
 
  updatePlayerName(playerId, data){
	  var team = localStorage.getItem("players");
    const itemToUpdate = teams.players.find(item => item.id === playerId);
    // Update the element
    if (itemToUpdate) {
      itemToUpdate.name = data['name'];
      itemToUpdate.number = data['number'];
    }
    localStorage.setItem("player", team);
    return JSON.stringify(itemToUpdate);
  }
}

export default new StatsDataService();