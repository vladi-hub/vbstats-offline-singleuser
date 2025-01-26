import * as Constants from "../components/constants";
import React from "react";

class PlayerDataService  {

  create(data) {
     var team = localStorage.getItem("players");
     var nextId = team.lastId + 1;
     var newPlayer = { "id": nextId, "name": data['name'], "number": data.number, "position":data['postion'] }
     team.players.push(newPlayer);
     localStorage.setItem("player", team);
     return nextId;
  }

  update(playerId, data) {
    var team = localStorage.getItem("players");
    const itemToUpdate = teams.players.find(item => item.id === playerId);
    // Update the element
    if (itemToUpdate) {
      itemToUpdate.name = data['name'];
      itemToUpdate.number = data['number'];
      itemToUpdate.position = data['position'];
    }
    localStorage.setItem("player", team);
    return JSON.stringify(itemToUpdate);
  }

  delete(playerId) {
    var team = localStorage.getItem("players");
    
    team.players.forEach((value, index) => {
      if(value.id == playerId){
         team.players.splice(index,1);
      }
    });
  }

  
  getAllPlayers() {
      var team = localStorage.getItem("players");
      console.log(" ======== " + team);
      if(team) {
        return JSON.stringify(team);
      } else {
        var data = {};
        return null;
      }
    
  }
}

export default new PlayerDataService();