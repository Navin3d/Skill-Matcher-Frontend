const getAccountData = () => (state) => state.account.entity;
const getAccountIsEditMode = () => (state) => state.account.isEditMode;

const getAccountLoadingStatus = () => state.account.loading;

const getSearchResult = () => (state) => state.account.search.entities;

const getSearchLoadingStatus = () => (state) => state.account.search.loading;

export {
  getAccountData,
  getAccountLoadingStatus,
  getSearchResult,
  getSearchLoadingStatus,
  getAccountIsEditMode,
};
