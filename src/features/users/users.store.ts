import { UpdateUsers } from "./pages/update-users.page";
import { createSlice } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";
import { buildBaseQueryWithReauthFunc } from "../../rtk-utils";
import { RootState } from "../../store/store";

interface ListResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: any[];
}

interface GetUserResponse<T> {
  id: string;
  nickName: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  // birthDay: string;
  roleId: string;
  active: boolean;
}

interface UpdateUsers {
  nickName: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  // birthDay: string;
  roleId: string;
  active: boolean;
}

export interface UpdateActivityResponse {
  id: string;
  active: boolean;
}

export const usersApi = createApi({
  reducerPath: "user",
  refetchOnFocus: false,
  refetchOnMountOrArgChange: true,
  baseQuery: buildBaseQueryWithReauthFunc("users"),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    fetchAllUsers: build.query<ListResponse<any>, any>({
      //build.query<ListResponse<any>, any>({
      query: (arg) => {
        const { currentPage, pageSize, search } = arg;
        return {
          url: "/getListUsers",
          params: { currentPage, pageSize, search },
        };
      },
      providesTags: (result) => ["Users"],
    }),
    createUser: build.mutation<any, any>({
      //<GetUserDto, CreateUserDto>
      query: (user) => ({
        url: "/createUser",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
      // transformResponse: (response: any) => response, //(response: TResponse)
    }),
    fetchOneUser: build.query<GetUserResponse<any>, any>({
      //<GetUserDto, string>
      query: (id) => ({
        url: `/getUserById/${id}`,
      }),
      providesTags: () => ["Users"],
      // transformResponse: (response: any) => response, //response?.data, //(response: TResponse)
    }),
    deleteUser: build.mutation<void, string>({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => ["Users"],
      transformResponse: (response: any) => response?.data, //(response: TResponse)
    }),
    updateUser: build.mutation<
      GetUserResponse<any>,
      { id: string; payload: UpdateUsers }
    >({
      //build.mutation<GetUserDto, { id: string, payload: UpdateUserByAdminDto }>
      query: ({ id, payload }) => ({
        url: `/updateUser/${id}`,
        method: "PUT",
        body: {
          ...payload,
        },
      }),
      invalidatesTags: () => ["Users"],
      transformResponse: (response: GetUserResponse<any>) => response, //(response: TResponse)
    }),
    updateActive: build.mutation<
      any,
      UpdateActivityResponse //payload: UpdateUsers
    >({
      //build.mutation<GetUserDto, { id: string, payload: UpdateUserByAdminDto }>
      // query: ({ payload }) => ({
      //   url: `/updateActive/${payload.id}`,
      //   method: "PUT",
      //   body: {
      //     ...payload,
      //   },
      // }),
      query: (payload) => {
        return {
          url: `/updateActive/${payload.id}`,
          method: "PUT",
          body: {
            ...payload,
          },
        };
      },
      invalidatesTags: () => ["Users"],
      // transformResponse: (response: GetUserResponse<any>) => response, //(response: TResponse)
    }),
  }),
});

export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useFetchAllUsersQuery,
  useFetchOneUserQuery,
  useUpdateUserMutation,
  useUpdateActiveMutation,
} = usersApi;

export interface UsersState {
  currentPage: any;
  pageSize: any;
  users: any[];
}

const initialState: UsersState = {
  currentPage: 1,
  pageSize: 10,
  users: [],
};

export const USERS_SLICE_KEY = "users";

export const usersSlice = createSlice({
  name: USERS_SLICE_KEY,
  initialState,
  reducers: {
    saveStateUsers(state) {
      state.users = state.users || [];
    },
    changePageNumber(state, action) {
      state.users = action.payload;
    },
  },
});

export const selectUsers = (state: RootState): UsersState => state.users;

export default usersSlice.reducer;

export const { changePageNumber } = usersSlice.actions;
