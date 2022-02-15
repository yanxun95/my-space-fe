import { USER_LOGIN } from "../actions";
import {
  SET_POSITION,
  UPDATE_MAIN_POSITION,
  UPDATE_POST_POSITION,
  UPDATE_UPLEFTCONTAINER_POSITION,
  UPDATE_USERINFO_POSITION,
  UPDATE_USERBG_POSITION,
} from "../actions";
import { initialState } from "../store";

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return {
        userInfo: action.payload,
        position: {},
      };
    }
    case SET_POSITION: {
      return {
        ...state,
        position: action.payload,
      };
    }
    case UPDATE_MAIN_POSITION: {
      return {
        ...state,
        position: { ...state.position, mainPosition: action.payload },
      };
    }
    case UPDATE_POST_POSITION: {
      return {
        ...state,
        position: { ...state.position, postPosition: action.payload },
      };
    }
    case UPDATE_UPLEFTCONTAINER_POSITION: {
      return {
        ...state,
        position: {
          ...state.position,
          upLeftContainerPosition: action.payload,
        },
      };
    }
    case UPDATE_USERINFO_POSITION: {
      return {
        ...state,
        position: { ...state.position, userInfo: action.payload },
      };
    }
    case UPDATE_USERBG_POSITION: {
      return {
        ...state,
        position: { ...state.position, userBgImage: action.payload },
      };
    }
    default:
      return state;
  }
};

export default userReducer;
