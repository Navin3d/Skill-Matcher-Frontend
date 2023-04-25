const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USER_ID = "user-id";
const USER_ROLE = "user-role";
const RESUME_NAME = "resumeName";

export function setTokens({ refreshToken, accessToken, expiresAt: expiresDate, id: userId, role }) {
  // const expiresDate = new Date().getTime() + 3480000;
  localStorage.setItem(USER_ID, userId);
  localStorage.setItem(USER_ROLE, role);
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate.toString());
}

export function getAccessToken() {
  return typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
}

export function getUserId() {
  return typeof window !== "undefined" ? localStorage.getItem(USER_ID) : null;
}

export function getRefreshToken() {
  return typeof window !== "undefined" ? localStorage.getItem(REFRESH_KEY) : null;
}

export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}

export function getAccountRole() {
  return typeof window !== "undefined" ? localStorage.getItem(USER_ROLE) : null;
}

export function removeAccessToken() {
  localStorage.setItem(TOKEN_KEY, "undefined");
}

export function removeAuthData() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(USER_ROLE);
  localStorage.removeItem(RESUME_NAME);
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getUserId,
  getAccountRole,
  removeAuthData,
  getTokenExpiresDate,
};
export default localStorageService;
