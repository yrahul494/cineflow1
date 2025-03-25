import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { json } from "stream/consumers";

interface Iprofile {
  name: string;
  email: string;
  profileUrl: string;
}
interface IUser {
  profile: Iprofile | null;
}
const initialState: IUser = {
  profile: null,
};

export const fetchUserProfile = createAsyncThunk(
  "user/profile",
  async (arg:string,{ dispatch }: any) => {
    try {
      const response: any = await await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}user/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const userDetails = await response.json();
      dispatch(setUser(userDetails));
      console.log(userDetails, "userDetails");
      // const data = await response.json()
      // console.log(data,"data")
      return userDetails;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateAvatar = createAsyncThunk(
    "user/profile",
    async (arg:string,{ dispatch }: any) => {
      try {
        const response: any = await await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}user/updateAvatar`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON?.stringify({avatar:arg})
          }
        );
        const userDetails = await response.json();
        dispatch(setUser(userDetails));
        console.log(userDetails, "userDetails");
        // const data = await response.json()
        // console.log(data,"data")
        return userDetails;
      } catch (error) {
        console.log(error);
      }
    }
  );

//Creation of Auth Slice with initial state and reducers
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
