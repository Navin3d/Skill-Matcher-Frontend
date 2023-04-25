const getUsers = () => (state) => state.users.entities;

const getUsersLoadingStatus = () => (state) => state.users.loading;

const getUserProfile = () => (state) => state.users.user.entity;

const getUserProfileLoadingStatus = () => (state) => state.users.user.loading;

export {
  getUsers,
  getUsersLoadingStatus,
  getUserProfile,
  getUserProfileLoadingStatus,
};
