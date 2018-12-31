export const SET_USER = 'SET_USER';
export const SET_TEST = 'SET_TEST';
export const SET_MENU_STATE = 'SET_MENU_STATE';

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function showMenu(bool) {
  return {
    type: SET_MENU_STATE,
    payload: bool,
  };
}

function rootReducer(
  state = {
    user: false,
    showMenu: false,
  },
  action
) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_MENU_STATE:
      return {
        ...state,
        showMenu: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
