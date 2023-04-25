import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import accountReducer from "./account/account.reducer";
import usersReducer from "./users/users.reducer";
import errorsReducer from "./errors/errors.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  users: usersReducer,
  errors: errorsReducer,
});

export default rootReducer;
