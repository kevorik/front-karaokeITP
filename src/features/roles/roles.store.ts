import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { buildBaseQueryWithReauthFunc } from "../../rtk-utils";
import { RootState } from "../../store/store";
import UpdateRole from "./pages/UpdateRolePage";

interface GetRolesResponse<T> {
  name: string;
  active: boolean;
}
interface UpdateRole {
  name: string;
  active: boolean;
}

export const rolesApi = createApi({
  reducerPath: "roles",
  refetchOnFocus: false,
  refetchOnMountOrArgChange: true,
  baseQuery: buildBaseQueryWithReauthFunc("roles"),
  tagTypes: ["Roles"],
  endpoints: (builder) => ({
    fetchAllRoles: builder.query<[], void>({
      query: () => `/getListRole`,
    }),
    fetchOneRole: builder.query<GetRolesResponse<any>, any>({
      //<GetUserDto, string>
      query: (id) => ({
        url: `/getRoleById/${id}`,
      }),
      providesTags: () => ["Roles"],
    }),
    createRole: builder.mutation<any, any>({
      //<GetUserDto, CreateUserDto>
      query: (role) => ({
        url: "/createRole",
        method: "POST",
        body: role,
      }),
      invalidatesTags: ["Roles"],
      // transformResponse: (response: any) => response, //(response: TResponse)
    }),
    updateRole: builder.mutation<
      GetRolesResponse<any>,
      { id: string; payload: UpdateRole }
    >({
      //build.mutation<GetUserDto, { id: string, payload: UpdateUserByAdminDto }>
      query: ({ id, payload }) => ({
        url: `/updateRole/${id}`,
        method: "PUT",
        body: {
          ...payload,
        },
      }),
      invalidatesTags: () => ["Roles"],
      transformResponse: (response: GetRolesResponse<any>) => response, //(response: TResponse)
    }),
  }),
});

export const {
  useFetchAllRolesQuery,
  useFetchOneRoleQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
} = rolesApi;
