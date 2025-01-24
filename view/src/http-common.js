import axios from "axios";
import * as Constants from "./components/constants";

export default axios.create({
  baseURL: Constants.SERVER_URL,
  headers: {
    "Content-type": "application/json"
  }
});