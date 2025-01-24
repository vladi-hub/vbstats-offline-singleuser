import AuthService from "./auth.service";
import * as Constants from "../components/constants";
import http from "../http-common";

class StatsDataService {
  
  get(gameId) {
    return AuthService.getAuthorizedAxios().get(Constants.SERVER_URL +`/stats/${gameId}`);
  }

  create(data) {
    return AuthService.getAuthorizedAxios().post(Constants.SERVER_URL +`/stats`, data);
  }

  update(statsId, data) {
    return AuthService.getAuthorizedAxios().put(Constants.SERVER_URL +`/stats/${statsId}`, data);
  }

  delete(statsId) {
    return AuthService.getAuthorizedAxios().delet(Constants.SERVER_URL +`/stats/${statsId}`);
  }

  deleteAllStats(gameId) {
    return AuthService.getAuthorizedAxios().delete(Constants.SERVER_URL +`/stats/all/${gameId}`);
  }
 
  updatePlayerName(playerId, data){
	  return AuthService.getAuthorizedAxios().put(Constants.SERVER_URL +`/stats/playername/${playerId}`, data);
  }
}

export default new StatsDataService();