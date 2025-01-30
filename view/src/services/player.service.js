import * as Constants from "../components/constants";
import React from "react";

class PlayerDataService  {

  create(data) {
     var team = localStorage.getItem("players");
     if(!team){
      team = {
        lastId: 0,
        players: [] // Add the empty array field
      };
     } else {
       team = JSON.parse(team);
     }
     var nextId = team.lastId + 1;
     var newPlayer = { "id": nextId, "name": data['name'], "number": data.number, "position":data['position'] }
     team.players.push(newPlayer);
     team.lastId = nextId;
     localStorage.setItem("players", JSON.stringify(team));
     return nextId;
  }

  update(playerId, data) {
    var team = JSON.parse(localStorage.getItem("players"));
    let itemToUpdate = team.players.find(item => item.id === parseInt(playerId));
    // Update the element
    if (itemToUpdate) {
      itemToUpdate.name = data['name'];
      itemToUpdate.number = data['number'];
      itemToUpdate.position = data['position'];
      localStorage.setItem("players", JSON.stringify(team));
    }
  }

  delete(playerId) {
    var team = JSON.parse(localStorage.getItem("players"));
    
    team.players.forEach((value, index) => {
      if(value.id == parseInt(playerId)){
         team.players.splice(index,1);
         localStorage.setItem("players", JSON.stringify(team));
      }
    });
  }

  
  getAllPlayers() {
      var team = localStorage.getItem("players");
      //console.log(" ======== " + team);
      if(team) {
        return team;
      } else {
        var data = {};
        return null;
      }
    
  }
}

export default new PlayerDataService();