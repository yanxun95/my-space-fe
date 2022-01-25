export const USER_LOGIN = "USER_LOGIN";
export const SET_POSITION = "SET_POSITION";
export const UPDATE_MAIN_POSITION = "UPDATE_MAIN_POSITION";
export const UPDATE_POST_POSITION = "UPDATE_POST_POSITION";
export const UPDATE_USERINFO_POSITION = "UPDATE_USERINFO_POSITION";
export const UPDATE_USERBG_POSITION = "UPDATE_USERBG_POSITION";

export const userLogin = (user) => ({
  type: USER_LOGIN,
  payload: user,
});

export const setPosition = (pos) => ({
  type: SET_POSITION,
  payload: pos,
});

export const updateMainPosition = (pos) => ({
  type: UPDATE_MAIN_POSITION,
  payload: pos,
});

export const updatePostPosition = (pos) => ({
  type: UPDATE_POST_POSITION,
  payload: pos,
});

export const updateUserInfoPosition = (pos) => ({
  type: UPDATE_USERINFO_POSITION,
  payload: pos,
});

export const updateUserBgPosition = (pos) => ({
  type: UPDATE_USERBG_POSITION,
  payload: pos,
});
