import { createSlice } from "@reduxjs/toolkit";

// =====================type declarations==============>
interface AuthStateType {
  isAuthenticated: boolean;
  userToken: null | string;
  userData: ServerResponseUserDataType | null;
}

interface ServerResponseUserDataType {
  firstName: string;
  lastName: string;
  email: string;
}

// ======================================================>

const initialState: AuthStateType = {
  isAuthenticated: false,
  userToken: null,
  userData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload.userData;
      state.userToken = action.payload.userToken;
    },
    loggedOut: (state) => {
      state.isAuthenticated = false;
      state.userToken = null;
      state.userData = null;
    },
  },
});

export const { loggedOut, loggedIn } = authSlice.actions;

export default authSlice.reducer;
