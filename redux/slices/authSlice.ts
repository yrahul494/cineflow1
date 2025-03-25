import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";

//Defining interface of the Auth State
interface AuthState {
  user: {
    email: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
}

//Setting up initial state of the auth state values
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const userLogin = createAsyncThunk(
  "auth/login",
  async (formData: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );
      const registerLogin = await response.json();
      thunkAPI.dispatch(login(registerLogin));
      console.log(registerLogin, "response");
      // const data = await response.json()
      // console.log(data,"data")
      return registerLogin;
    } catch (error) {
      console.log(error);
    }
  }
);

export const userRegister = createAsyncThunk(
  "auth/register",
  async (formData: { name: string; email: string; password: string },thunkAPI) => {
    try {
      const response = await await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name:formData?.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );
      const registerUser = await response.json();
      thunkAPI.dispatch(logout(registerUser));
      console.log(userLogin, "response");
      // const data = await response.json()
      // console.log(data,"data")
      return registerUser;
    } catch (error) {
      console.log(error);
    }
  }
);

//Creation of Auth Slice with initial state and reducers
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //login  reducer that takes the previous state and updates the state in the reducer
    login: (state, action: PayloadAction<{user: { email: string }, email: string; token: string }>) => {
      state.user = {
        email: action.payload.user.email,
      };
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
