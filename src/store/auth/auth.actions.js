import { authService, localStorageService } from "../../services";
import { handleError } from "../errors/errors.actions";
import errorsSlice from "../errors/errors.slice";
import authSlice from "./auth.slice";

const { succeed, loggedOut } = authSlice.actions;
const { handled } = errorsSlice.actions;

const signUp =
  ({ router, ...payload }) =>
  async (dispatch) => {
    try {
      const { content } = await authService.registration(payload);
      localStorageService.setTokens(content);
      dispatch(succeed());
      router.push(content.role === "Candidate" ? "/cabinet" : "/");
    } catch (error) {
      dispatch(handleError(error));
    }
  };

const signIn =
  ({ router, ...payload }) =>
  async (dispatch) => {
    try {
      console.log("payload: ", payload);
      const { content } = await authService.login(payload);
      console.log("sign in content: ", content);
      localStorageService.setTokens(content);
      dispatch(succeed(content.id));
      router.push(content.role === "Candidate" ? "/cabinet" : "/");
    } catch (error) {
      // console.log(error);
      // dispatch(handleError(error));
      dispatch(handled("Password or Email is wrong!"));
    }
  };

const logOut = () => async (dispatch) => {
  dispatch(loggedOut());
  localStorageService.removeAuthData();
};

export { signUp, signIn, logOut };
