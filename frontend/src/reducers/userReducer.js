const initialUserState = {
  user: null,
  auth: { token: null, isAuth: false },
  posts: [],
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        user: action.payload.user,
        auth: { token: action.payload.token, isAuth: true },
      };

    case "USER_INFO":
      return { ...state, user: action.payload };

    case "USER_POSTS":
      return { ...state, posts: action.payload };

    case "POSTS_CLEANUP":
      return { ...state, posts: [] };

    case "USER_LOGOUT":
      return initialUserState;

    case "CLEAN_UP":
      return initialUserState;

    default:
      return state;
  }
};

const initialError = {
  error: null,
  loading: false,
};

const errorReducer = (state = initialError, action) => {
  switch (action.type) {
    case "REQUEST":
      return { error: null, loading: true };
    case "SUCCESS":
      return { error: null, loading: false };
    case "ERROR":
      return { error: action.payload, loading: false };
    case "CLEAN_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

const allUsersInitial = {
  allUsers: [],
};

const allUsersReducer = (state = allUsersInitial, action) => {
  switch (action.type) {
    case "GET_ALL_USERS":
      return { ...state, allUsers: action.payload };

    case "ALL_USERS_CLEAN":
      return { ...state, allUsers: [] };

    default:
      return state;
  }
};

const postsInitial = {
  followingPosts: [],
};

const postsReducer = (state = postsInitial, action) => {
  switch (action.type) {
    case "GET_FOLLOWING_POSTS":
      return { ...state, followingPosts: action.payload };
    case "CLEAN_FOLLOWING_POSTS":
      return { ...state, followingPosts: [] };
    default:
      return state;
  }
};
export { userReducer, errorReducer, allUsersReducer, postsReducer };
