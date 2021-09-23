import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  allUsersReducer,
  errorReducer,
  userReducer,
  postsReducer,
} from "./reducers/userReducer";
import { getUserInfo } from "./actions/userAction";

const reducers = combineReducers({
  userInfo: userReducer,
  error: errorReducer,
  users: allUsersReducer,
  posts: postsReducer,
});

let initialState = {
  userInfo: {
    user: null,
    auth: {
      token: null,
      isAuth: false,
    },
    posts: [],
  },
  error: {
    loading: false,
    error: null,
  },
  users: {
    allUsers: [],
  },
  posts: {
    followingPosts: [],
  },
};

const localStorageToken = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

if (localStorageToken) {
  initialState = {
    ...initialState,
    userInfo: {
      ...initialState.userInfo,
      auth: { token: localStorageToken, isAuth: true },
    },
  };
}

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.getItem("token")) {
  store.dispatch(getUserInfo(JSON.parse(localStorage.getItem("token"))));
}

export default store;
