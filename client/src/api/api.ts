import axios from 'axios';
import { LoginArgs, AuthResponse, RegisterArgs, GetMeResponse, RegisterResponse } from './types';
//import jwtDecode from "jwt-decode";

const BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
});

api.interceptors.request.use(
  async (config) => {
    const userDetails: any = localStorage.getItem('currentUser');

    if (userDetails !== undefined && userDetails !== null) {
      const token = JSON.parse(userDetails).token;
      config.headers!['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

//   localStorage.clear();
//   window.location.pathname = "/login";
// };

export const login = async ({ email, password }: LoginArgs) => {
  try {
    const res = await api.post<AuthResponse>('/api/auth/login', {
      email,
      password,
    });

    return res.data;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data,
    };
  }
};

export const register = async ({ email, password, username }: RegisterArgs) => {
  try {
    const res = await api.post<RegisterResponse>('/api/auth/register', {
      email,
      password,
      username,
    });
    return res;
  } catch (err: any) {
    return {
      error: true,
      message: err?.response?.data,
    };
  }
};

// protected routes

export const getMe = async () => {
  try {
    const res = await api.get<GetMeResponse>('/api/auth/me');
    console.log(res);
    return {
      me: res.data.me,
      statusCode: 200,
    };
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data,
      statusCode: err?.response?.status,
    };
  }
};

export const getAllUser = async (userId: any) => {
  try {
    const res = await api.get<any>(`/api/user/getAll/${userId}`);
    return {
      users: res.data,
      statusCode: 200,
    };
  } catch (err: any) {
    console.log(err);
    return {
      error: true,
      message: err?.response?.data,
      statusCode: err?.response?.status,
    };
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const res = await api.delete<any>(`/api/user/deleteUser/${userId}`);
    return res;
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      message: error?.response?.data,
      statusCode: error?.response?.status,
    };
  }
};

export const getAllContest = async () => {
  try {
    const res: any = await api.get<any>(`/api/contest/getAll`);
    return res;
  } catch (error: any) {
    console.log('error asd', error);
    return {
      error: true,
      message: error,
    };
  }
};

export const getAllContestResult = async () => {
  try {
    const res: any = await api.get<any>(`/api/contest/getAllDetail`);
    return res;
  } catch (error: any) {
    console.log('error asd', error);
    return {
      error: true,
      message: error,
    };
  }
}

export const createContest = async (title: string, description: string, hostId: any) => {
  try {
    console.log(title, description, hostId);
    const res = await api.post<any>(`/api/contest/create`, {
      title: title,
      description: description,
      hostId: hostId,
    });
    console.log(res);
    return res;
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      message: error,
    };
  }
};

export const deleteContest = async (contestId: string) => {
  try {
    const res = await api.delete<any>(`/api/contest/${contestId}`);
    return res;
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      message: error?.response?.data,
      statusCode: error?.response?.status,
    };
  }
};

export const getContestDetail = async (contestId: any) => {
  try {
    const res = await api.get<any>(`/api/contest/${contestId}`);
    return res;
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      message: error,
    };
  }
};

export const createFillInBlankQuest = async (contestId: any, data: any) => {
  try {
    const res = await api.post<any>(`/api/contest/${contestId}/fillInBlankQuest`, data);
    return res;
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      message: error,
    };
  }
};

export const deleteFill = async (contestId: any, fillInBlankQuestId: any) => {
  try {
    const res = await api.delete<any>(`/api/contest/${contestId}/fillInBlankQuest/${fillInBlankQuestId}`);
    return res;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error,
    };
  }
};
export const creatMCQ = async (contestId: any, mCQuest: any) => {
  try {
    const res = await api.post<any>(`/api/contest/${contestId}/mcqQuest`, mCQuest);
    return res;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error,
    };
  }
};

export const updateFillInBlankQuest = async (data: any, fillInBlankQuestId: any) => {
  try {
    const res = await api.patch(`/api/contest/fillInBlankQuest/update/${fillInBlankQuestId}`, data);
    return res;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error,
    };
  }
};

export const updateMCQQuest = async (data: any, mcqId: any) => {
  try {
    const res = await api.patch(`/api/contest/mcqQuest/update/${mcqId}`, data);
    return res;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error,
    };
  }
};

export const addUserToContest = async (userId: any, contestId: any) => {
  try {
    const res = await api.patch(`/api/participant/addUser/${contestId}`, userId);
    return res;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error,
    };
  }
};

export const getAddedContest = async (userId: any) => {
  try {
    const res = await api.get(`/api/participant/${userId}`);
    return res;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error,
    };
  }
};

export const getUsers = async () => {
  try {
    const res = await api.get<any>(`/api/user`);
    return {
      users: res.data,
      statusCode: 200,
    };
  } catch (err: any) {
    console.log(err);
    return {
      error: true,
      message: err?.response?.data,
      statusCode: err?.response?.status,
    };
  }
};

export const getTestDetail = async (contestId: any) => {
  try {
    const res = await api.get(`/api/contest/getTest/${contestId}`);
    return res;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error,
    };
  }
};

export const getResult = async (contestId: any, userId: any) => {
  try {
    const res: any = api.get(`/api/result/${contestId}/${userId}`);
    return res;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error,
    };
  }
};

export const updateUserRole = async (userId: any, newRole: any) => {
  try {
    const res: any = await api.patch(`/api/user/updateRole/${userId}`, {
      role: newRole,
    });
    return res;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error,
    };
  }
};

export const submit = async (data: any) => {
  try {
    const res: any = await api.post(`/api/result/submit`, {
      userId: data.userId,
      contestId: data.contestId,
      answers: data.answers,
    });
    return res;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error,
    };
  }
};
