export enum actionTypes {
  authenticate,
  logout,
  authError,
  authLoading,
  showAlert,
  hideAlert,
}

export interface CurrentUser {
  _id: string;
  email: string;
  token: string;
  username: string;
  role: string;
}
interface AuthSuccessAction {
  type: actionTypes.authenticate;
  payload: {
    _id: string;
    email: string;
    token: string;
    username: string;
    role: string;
  };
}

interface AuthErrorAction {
  type: actionTypes.authError;
  payload: string;
}

interface LogoutAction {
  type: actionTypes.logout;
}

interface AuthLoadingAction {
  type: actionTypes.authLoading;
  payload: boolean;
}

interface ShowAlertAction {
  type: actionTypes.showAlert;
  payload: string;
}

interface HideAlertAction {
  type: actionTypes.hideAlert;
}

export type AuthActions =
  | AuthSuccessAction
  | AuthErrorAction
  | LogoutAction
  | AuthLoadingAction;
export type AlertActions = ShowAlertAction | HideAlertAction;
