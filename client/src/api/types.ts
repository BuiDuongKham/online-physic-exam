export type LoginArgs = {
  email: string;
  password: string;
};
export type ResetPasswordArgs = {
  email: string;
};
export type ConfirmPasswordArgs = {
  confirmPassword: string;
  token: string;
};

export type RegisterArgs = {
  email: string;
  password: string;
  username: string;
};

export type InviteFriendArgs = {
  email: string;
};

export type AuthResponse = {
  userDetails: {
    _id: string;
    email: string;
    token: string;
    username: string;
    role: string;
  };
};
export type RegisterResponse = {
  status: number;
  message: string;
};

export type GetMeResponse = {
  me: {
    _id: string;
    email: string;
    username: string;
    role: string;
  };
};

