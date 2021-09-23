import axios from "axios";

const authConfig = (token) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};

//ERROR HANDLER FUNCTION
const errorHandler = (error, dispatch) => {
  if (error.response.status === 401) {
    dispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("token");
  } else {
    dispatch({
      type: "ERROR",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const loginUser = async (dispatch, data) => {
  try {
    const { token } = data;
    localStorage.setItem("token", JSON.stringify(token));
    const config = authConfig(token);
    const { data: userData } = await axios.get(
      "/api/users/auth/userData",
      config
    );
    dispatch({ type: "USER_LOGIN", payload: { user: userData, token: token } });
  } catch (error) {
    throw error;
  }
};

const getUser = async (dispatch, token) => {
  try {
    const config = authConfig(token);
    const { data } = await axios.get("/api/users/auth/userData", config);
    dispatch({ type: "USER_INFO", payload: data });
  } catch (error) {
    throw error;
  }
};

export { authConfig, errorHandler, loginUser, getUser };
