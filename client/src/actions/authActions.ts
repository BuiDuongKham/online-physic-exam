import { Dispatch } from "redux";
import { register, getMe, login } from "../api/api";
import { LoginArgs, RegisterArgs } from "../api/types";
import { showAlert } from "./alertActions";
// import { resetChatAction } from "./chatActions";
// import { resetFriendsAction } from "./friendActions";
import { actionTypes, CurrentUser } from "./types";

export const loginUser = (credentials: LoginArgs) => {
  return async (dispatch: Dispatch) => {
    const response = await login(credentials);
    if ("error" in response) {
      dispatch({
        type: actionTypes.authError,
        payload: response.message,
      });

      dispatch(showAlert(response.message));
    } else {
      localStorage.setItem("currentUser", JSON.stringify(response.userDetails));
      dispatch({
        type: actionTypes.authenticate,
        payload: response.userDetails,
      });

      dispatch(
        showAlert(`Hi, ${response.userDetails.username} 👋. Welcome back.`)
      );
    }
  };
};

export const registerUser = (credentials: RegisterArgs) => {
  return async (dispatch: Dispatch) => {
    const response: any = await register(credentials);
    if (response.status !== 200) {
      dispatch({
        type: actionTypes.authError,
        payload: response.message,
      });
      dispatch(showAlert(response.message));
    } else {
      localStorage.setItem("currentUser", JSON.stringify(response.data.userDetails));
      dispatch({
        type: actionTypes.authenticate,
        payload: response.data.userDetails,
      });
      dispatch(showAlert(`Hi 👋. Welcome😊.`));
    }
  };
};

export const autoLogin = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: actionTypes.authLoading,
      payload: true,
    });

    const currentUserJSON = localStorage.getItem("currentUser");
    if (currentUserJSON !== undefined && currentUserJSON !== null) {
      try {
        const currentUser: CurrentUser = JSON.parse(currentUserJSON);

        const response = await getMe();
        if (response.statusCode === 401 || response.statusCode === 403) {
          localStorage.clear();
          dispatch({
            type: actionTypes.authLoading,
            payload: false,
          });
        } else {
          if (currentUser?.token) {
            dispatch({
              type: actionTypes.authenticate,
              payload: {
                ...response.me,
                token: currentUser?.token,
              },
            });
          }
        }
      } catch (error) {
        console.error("Error parsing currentUser:", error);
        localStorage.clear();
        dispatch({
          type: actionTypes.authLoading,
          payload: false,
        });
      }
    } else {
      localStorage.clear();
      dispatch({
        type: actionTypes.authLoading,
        payload: false,
      });
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: Dispatch) => {
    localStorage.removeItem("currentUser");
    dispatch({
      type: actionTypes.logout,
    });
  };
};
