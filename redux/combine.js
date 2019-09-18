import { combineReducers } from "redux";
import { currentPage } from "./reducers";

const MyApp = combineReducers({
  currentPage,
});

export default MyApp;