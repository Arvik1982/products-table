import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  createApi,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { LoginData, IUser } from "../types";
import storage, { STORAGE_KEYS } from "../storage/storage";
import { account, login, testServer } from "../constants/ endpoints";

interface AuthState {
  token: string;
  isAuthenticated: boolean;
  remember: boolean;
  user: IUser | null;
}

const getStoredToken = () => {
  const remember = storage.load<boolean>(STORAGE_KEYS.REMEMBER_ME, false);
  if (remember) {
    return storage.load<string>(STORAGE_KEYS.AUTH_TOKEN, "");
  } else {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) || "";
  }
};

const initialState: AuthState = {
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken(),
  remember: storage.load<boolean>(STORAGE_KEYS.REMEMBER_ME, false),
  user: null,
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: testServer,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<IUser, LoginData>({
      query: (credentials) => ({
        url: login,
        method: "POST",
        body: credentials,
      }),
      transformErrorResponse: (response: FetchBaseQueryError) => {
        if (
          "data" in response &&
          typeof response.data === "object" &&
          response.data !== null
        ) {
          const apiError = response.data as { message?: string };
          return apiError.message || "Invalid credentials";
        }
        return "Invalid credentials";
      },
    }),
    getMe: builder.query<IUser, void>({
      query: () => ({
        url: account,
        method: "GET",
      }),
    }),
  }),
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{
        token: string;
        user: IUser;
        remember: boolean;
      }>,
    ) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.remember = action.payload.remember;
      const userJson = JSON.stringify(action.payload.user);
      if (action.payload.remember) {
        storage.save(STORAGE_KEYS.AUTH_TOKEN, action.payload.token);
        storage.save(STORAGE_KEYS.USER_DATA, userJson);
        storage.save(STORAGE_KEYS.REMEMBER_ME, true);
        sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      } else {
        sessionStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, action.payload.token);
        sessionStorage.setItem(
          STORAGE_KEYS.USER_DATA,
          JSON.stringify(action.payload.user),
        );
        storage.save(STORAGE_KEYS.REMEMBER_ME, false);
        storage.remove(STORAGE_KEYS.AUTH_TOKEN);
      }
    },
    setRemember: (state, action: PayloadAction<boolean>) => {
      state.remember = action.payload;
      storage.save(STORAGE_KEYS.REMEMBER_ME, action.payload);
    },
    logout: (state) => {
      state.token = "";
      state.isAuthenticated = false;
      state.user = null;

      storage.remove(STORAGE_KEYS.AUTH_TOKEN);
      storage.remove(STORAGE_KEYS.USER_DATA);
      sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      sessionStorage.removeItem(STORAGE_KEYS.USER_DATA);
    },

    restoreSession: (state) => {
      const token = getStoredToken();
      if (!token) return;

      state.token = token;
      state.isAuthenticated = true;
      state.remember = storage.load(STORAGE_KEYS.REMEMBER_ME, false);

      try {
        const userDataRaw = state.remember
          ? storage.load<string>(STORAGE_KEYS.USER_DATA, "")
          : sessionStorage.getItem(STORAGE_KEYS.USER_DATA);

        if (typeof userDataRaw === "string" && userDataRaw !== "null") {
          const userData = JSON.parse(userDataRaw);
          if (userData && typeof userData === "object") {
            state.user = userData as IUser;
          }
        }
      } catch (error) {
        console.warn("Failed to restore session:", error);

        if (state.remember) {
          storage.remove(STORAGE_KEYS.USER_DATA);
        } else {
          sessionStorage.removeItem(STORAGE_KEYS.USER_DATA);
        }
        state.user = null;
      }
    },
  },
});

export const { setToken, setRemember, logout, restoreSession } =
  authSlice.actions;
export const { useLoginMutation, useGetMeQuery } = authApi;
export default authSlice.reducer;
