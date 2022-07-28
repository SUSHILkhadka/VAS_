import { combineReducers } from "redux";

interface Auth {
  login: string;
  username: string;
}

export const counterReducer = (state: number = 0, action: any) => {
  switch (action.type) {
    case "add":
      return state + action.payload;
    case "sub":
      return state - action.payload;
    default:
      return state;
  }
};

const defaultValue: Auth = {
  login: "true",
  username: "default",
};

export const authReducer = (state: Auth = defaultValue, action: any) => {
  switch (action.type) {
    case "MakeLoggedIn":
      return{
        login: "true",
        username: state.username
      }
      case "MakeLoggedOut":
        return{
          login: "false",
          username: "name after log out"
        }
    case "ChangeName":
      return {
        login: "true",
        username: action.payload,
      };
    default:
      return state;
  }
};

interface RegisterInfo {
  username: string;
  email: string;
}

const defaultRegisterInfo: RegisterInfo={
  username: "",
  email: ""
}

export const registerReducer = (state: RegisterInfo = defaultRegisterInfo, action: any) => {
  switch (action.type) {
    case "SaveName":
      return{
        username: action.payload,
        email: state.email,
      }
      case "SaveEmail":
        return{
          username: state.username,
          email: action.payload
        }
    default:
      return state;
  }
};
export const allReducers = combineReducers({
  firstreducer: counterReducer,
  secondreducer: authReducer,
  thirdreducer: registerReducer
});
