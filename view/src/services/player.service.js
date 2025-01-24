import http from "../http-common";
import AuthService from "./auth.service";
import * as Constants from "../components/constants";

class PlayerDataService {
  
  create(data) {
    return AuthService.getAuthorizedAxios().post(Constants.SERVER_URL +'/player', data);
  }

  update(playerId, data) {
    return AuthService.getAuthorizedAxios().put(Constants.SERVER_URL +`/player/${playerId}`, data);
  }

  delete(playerId) {
    return AuthService.getAuthorizedAxios().delete(Constants.SERVER_URL +`/player/${playerId}`);
  }

  getAllPerUser(userId) {
	  return AuthService.getAuthorizedAxios().get(Constants.SERVER_URL +`/player/all/${userId}`);
  }
}

export default new PlayerDataService();