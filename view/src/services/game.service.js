import AuthService from "./auth.service";
import * as Constants from "../components/constants";
import http from "../http-common";

class GameDataService {
  
  getAllPerUser(userId) {
    return AuthService.getAuthorizedAxios().get(Constants.SERVER_URL +`/game/${userId}`);
  }

  create(data) {
    return AuthService.getAuthorizedAxios().post(Constants.SERVER_URL +"/game", data);
  }

  update(gameId, data) {
    return AuthService.getAuthorizedAxios().put(Constants.SERVER_URL +`/game/${gameId}`, data);
  }

  delete(gameId) {
    return AuthService.getAuthorizedAxios().delete(Constants.SERVER_URL +`/game/${gameId}`);
  }

}

export default new GameDataService();