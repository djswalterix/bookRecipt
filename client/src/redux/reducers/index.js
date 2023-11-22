import { combineReducers } from "redux";
import authReducer from "./authSlice.reducer";
import registrationSlice from "./registrationSlice.reducer";
import recipesReduced from "./recipesReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  registration: registrationSlice,
  recipes: recipesReduced,
});
export default rootReducer;
