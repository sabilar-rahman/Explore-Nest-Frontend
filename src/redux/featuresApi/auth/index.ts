import baseApi from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
    }),
    recoverPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/recover-password",
        method: "PUT",
        body: userInfo,
      }),
    }),
    changePassword: builder.mutation({
      query: (newPass) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: newPass,
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  // useRegistrationMutation,
  useSignupMutation,
  useChangePasswordMutation,
  useRecoverPasswordMutation,
  useRefreshTokenMutation,
} = authApi;