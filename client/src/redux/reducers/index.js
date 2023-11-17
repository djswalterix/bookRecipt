import { combineReducers } from "redux";
import authReducer from "./authSlice.reducer";
import registrationSlice from "./registrationSlice.reducer";
const rootReducer = combineReducers({
  auth: authReducer,
  registration: registrationSlice,
});
export default rootReducer;
