import * as Constants from "../components/constants";
//import { Realm, RealmProvider, useRealm, useQuery } from '@realm/react'
import * as Realm from "realm-web";

const app = new Realm.App({ id: APP_ID });
// Create an anonymous credential
const credentials = Realm.Credentials.anonymous();
// Authenticate the user
const user = app.logIn(credentials);

class PlayerDataService  {
  
  create(data) {
    
    return "";
  }

  update(playerId, data) {
    return "";
  }

  delete(playerId) {
    return "";
  }

  getAllPerUser(userId) {
	  return "";
  }
}

export default new PlayerDataService();