import { accountService } from "../../services";
import { successToast } from "../../utils/core";
import { logOut } from "../auth/auth.actions";
import { handleError } from "../errors/errors.actions";
import accountSlice from "./account.slice";

export const { requested, received, failed, updateIsEditMode } = accountSlice.actions;

const loadAccount = () => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await accountService.get();
    dispatch(received(content));
  } catch (error) {
    dispatch(failed());
    dispatch(handleError(error));
  }
};

const deleteAccount = () => async (dispatch) => {
  try {
    const { content } = await accountService.delete();
    console.log("deleted");
    dispatch(logOut());
  } catch (error) {
    dispatch(failed());
    dispatch(handleError(error));
  }
};

const updateAccount =
  ({ toast, ...payload }) =>
  async (dispatch) => {
    try {
      const { content } = await accountService.update(payload);
      dispatch(loadAccount());
      toast(successToast({ title: "Account updated successfully!" }));
    } catch (error) {
      dispatch(handleError(error));
    }
  };

const resetPassword =
  ({ toast, ...payload }) =>
  async (dispatch) => {
    try {
      const { content } = await accountService.post(payload);
      dispatch(loadAccount());
      toast(successToast({ title: "Password updated successfully!" }));
    } catch (error) {
      dispatch(handleError(error));
    }
  };

const updateAccountPhoto = (payload) => async (dispatch) => {
  try {
    const { content } = await accountService.updatePhoto(payload);
  } catch (error) {
    dispatch(handleError(error));
  }
};

export { loadAccount, updateAccount, updateAccountPhoto, resetPassword, deleteAccount };
