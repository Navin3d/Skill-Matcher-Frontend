import usersSlice from "./users.slice";
import { usersService } from "../../services";
import { handleError } from "../errors/errors.actions";

const {
  requested,
  received,
  failed,
  searchRequested,
  searchReceived,
  searchFailed,
  userRequested,
  userReceived,
  userFailed,
} = usersSlice.actions;

const loadUserById = (id) => async (dispatch) => {
  dispatch(userRequested());
  try {
    const { content } = await usersService.getById(id);
    dispatch(userReceived(content));
  } catch (error) {
    dispatch(userFailed());
    dispatch(handleError(error));
  }
};

const loadAllUsers = (page) => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await usersService.getAll(page);
    // console.log(content);
    dispatch(received(content));
  } catch (error) {
    dispatch(failed());
    dispatch(handleError(error));
  }
};

const searchUsers = (payload) => async (dispatch) => {
  dispatch(searchRequested());
  try {
    const { content } = await usersService.search(payload);
    console.log(content);
    dispatch(searchReceived(content));
  } catch (error) {
    dispatch(searchFailed());
    dispatch(handleError(error));
  }
};

export { loadUserById, loadAllUsers, searchUsers };
