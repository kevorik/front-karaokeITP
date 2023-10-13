import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {
//     JwtResponseDto,
//     LoginPayloadDto,
//     TResponse,
//     UpdatePasswordRequestDto,
//     ValidateUserResponseDto,
// } from "../../core/models";
import { getEndpointUrl, addAuthHeader } from "../../shared/utils";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

export interface RegisterRes {
  data?: any;
  error?: any;
}

export interface AuthState {
  user: any | null;
  role: any;
  //  ValidateUserResponseDto | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: "",
  accessToken: "",
  role: {},
};

export const AUTH_SLICE_KEY = "auth";

export const authSlice = createSlice({
  name: AUTH_SLICE_KEY,
  initialState,
  reducers: {
    login(state, payload: PayloadAction<any>) {
      //<JwtResponseDto>

      const { accessToken, ...user } = payload.payload;

      return {
        ...state,
        user,
        accessToken,
      };
    },
    logout(state) {
      return {
        ...state,
        user: null,
        accessToken: null,
      };
    },
    register(state, payload: PayloadAction<any>) {
      const { accessToken, ...user } = payload.payload;

      return {
        ...state,
        user,
        accessToken,
      };
    },
  },
});

export const selectAuth = (state: RootState): AuthState => state.auth;
export const selectAuthorizedUser = (state: RootState): any | null =>
  selectAuth(state).user; //ValidateUserResponseDto | null
export const selectAccessToken = (state: RootState): string | null =>
  selectAuth(state).accessToken;

export const selectAccessRole = (state: RootState): any | null =>
  selectAuth(state).user.role;

export const setAuthTokenToRequest: (
  headers: Headers,
  api: Pick<BaseQueryApi, "getState" | "extra" | "endpoint" | "type" | "forced">
) => MaybePromise<Headers> = (headers, { getState }) => {
  const rootState = getState() as RootState;

  const token = selectAccessToken(rootState);
  addAuthHeader(headers, token);
  return headers;
};

export const useIsAuthorized = (): boolean => {
  const accessToken = useAppSelector(selectAccessToken);
  return Boolean(accessToken);
};
export const useAccessRole = (): any => {
  const accessRole = useAppSelector(selectAccessRole);
  return accessRole;
};

export const { login, logout, register } = authSlice.actions;

export const AUTH_API_KEY = "authApi";

export const authApi = createApi({
  reducerPath: AUTH_API_KEY,
  refetchOnFocus: false,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: getEndpointUrl("auth"),
    prepareHeaders: (headers, { getState }) => {
      const rootState = getState() as RootState;
      const token = selectAccessToken(rootState);
      addAuthHeader(headers, token);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      //<JwtResponseDto, LoginPayloadDto>
      query: (payload: any) => ({
        //(payload: LoginPayloadDto)
        url: "login",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: any) => response, //(response: TResponse)
    }),
    register: builder.mutation<any, any>({
      //<GetUserDto, CreateUserDto>
      query: (body) => ({
        url: "register",
        method: "POST",
        body: body,
      }),
      transformResponse: (response: RegisterRes) => response, //(response: TResponse)
    }),
    changeUserPassword: builder.mutation<void, any>({
      //<void, UpdatePasswordRequestDto>
      query: (payload) => ({
        url: `update-password`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: any) => response?.data, //(response: TResponse)
    }),
  }),
});

export const {
  useLoginMutation,
  useChangeUserPasswordMutation,
  useRegisterMutation,
} = authApi;
