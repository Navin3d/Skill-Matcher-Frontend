const getIsLoggedInStatus = () => (state) => state.auth?.isLoggedIn;

const getAccountId = () => (state) => state.auth.id;

export { getIsLoggedInStatus, getAccountId };
