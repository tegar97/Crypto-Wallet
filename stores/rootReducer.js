import { combineReducers } from "redux";

import tabReducer from "./tab/tabReducer";
import marketReducer from "./Market/MarketReducer";
export default combineReducers({
  tabReducer,
  marketReducer,
});
