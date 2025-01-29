import * as Constants from "../components/constants";

class StatsDataService {
  
  get(gameId) {
    var name = gameId + "_stat";
    var stats = localStorage.getItem(name);
    if(stats) {
      return stats;
    } else {
      var data = {};
      return null;
    }
  }

  create(data) {
    var name = data.gameId + "_stat";
    
    var stat = localStorage.getItem(name);
    if(!stat){
      stat = {
       lastId: 0,
       stats: [] // Add the empty array field
     };
    } else {
      stat = JSON.parse(stat);
    }
    var nextId = stat.lastId + 1;
    var newStat = {
      "b_error": 0,
      "b_touch": 0,
      "b_block": 0,
      "b_success": 0,
      "playerId": data['playerId'],
      "gameId": data['gameId'],
      "name": data['name'],
      "number": data['number'],
      "position": data['position'],
      "d_missed": 0,
      "d_touch": 0,
      "d_success": 0,
      
      "h_error": 0,
      "h_kill": 0,
      "h_total": 0,
      
      "p_error": 0,
      "p_poor": 0,
      "p_keep": 0,
      "p_perfect": 0,
      
      "s_total": 0,
      "s_ace": 0,
      "s_error": 0
      }
    stat.stats.push(newStat);
    stat.lastId = nextId;
    localStorage.setItem(name, JSON.stringify(stat));
    return nextId;
  }

  update(playerId, gameId, data) {
    var name = gameId + "_stat";
    var statz = JSON.parse(localStorage.getItem(name));
    const itemToUpdate = statz.stats.find(item => item.id === (playerId - 1));
    // Update the element
    if (itemToUpdate) {
      itemToUpdate.b_error = data['b_error'];
      itemToUpdate.b_touch = data['b_touch'];
      itemToUpdate.b_block = data['b_block'];
      itemToUpdate.b_success = data['b_success'];

      itemToUpdate.playerId = data['playerId'];
      itemToUpdate.gameId = data['gameId'];
      itemToUpdate.name = data['name'];
      itemToUpdate.number = data['number'];
      itemToUpdate.position = data['position'];

      itemToUpdate.d_missed = data['d_missed'];
      itemToUpdate.d_touch = data['d_touch'];
      itemToUpdate.d_success = data['d_success'];

      itemToUpdate.h_error = data['h_error'];
      itemToUpdate.h_kill = data['h_kill'];
      itemToUpdate.h_total = data['h_total'];

      itemToUpdate.p_error = data['p_error'];
      itemToUpdate.p_poor = data['p_poor'];
      itemToUpdate.p_keep = data['p_keep'];
      itemToUpdate.p_perfect = data['p_perfect'];

      itemToUpdate.s_total = data['s_total'];
      itemToUpdate.s_ace = data['s_ace'];
      itemToUpdate.s_error = data['s_error'];

      localStorage.setItem(name, JSON.stringify(statz));
    }
  }
 
  updatePlayerName(playerId, data){
	  var team = JSON.parse(localStorage.getItem("players"));
    let itemToUpdate = team.players.find(item => item.id === playerId);
    // Update the element
    if (itemToUpdate) {
      itemToUpdate.name = data['name'];
      itemToUpdate.number = data['number'];
      localStorage.setItem("player", team);
    }
    
    return JSON.stringify(itemToUpdate);
  }

  deleteAllStats(gameId) {
    var name = gameId + "_stat";
    localStorage.removeItem(name);
  }
}

export default new StatsDataService();