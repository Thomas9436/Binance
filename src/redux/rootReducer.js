// rootReducer.js
import { combineReducers } from "redux";
import cryptoReducer from "./reducers/cryptoReducer";

export default combineReducers({
  crypto: cryptoReducer,
});
