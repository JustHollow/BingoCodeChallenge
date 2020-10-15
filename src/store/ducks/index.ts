import { combineReducers } from "redux";
import grid from "./grid";
import matches from "./matches";

export type RootState = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({ grid, matches });

export default rootReducer;
