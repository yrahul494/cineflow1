import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react";
// import axi

//Defining interface of the Auth State
export interface Comment {
  _id?: string;
  user: {
    name: string;
    avatar?: string;
  };
  comment: string;
  createdAt?: Date;
}

export interface VideoCommentsResponse {
  result: Comment[];
  total?: number;
}

interface AuthState {
  loading: boolean;
  allVideos: any[];
  selectedMovie: string;
  showDialog: boolean;
  movies: any[];
  tvShows: any[];
  clickedCard: any;
  showDes: string;
  userWatchHistory: any[];
  commentResponse: any;
  videoComments: VideoCommentsResponse | null;
  likeResponse: any;
  aiRecommendationList: any[];
}

//Setting up initial state of the auth state values
const initialState: AuthState = {
  loading: false,
  allVideos: [],
  selectedMovie: "",
  showDialog: false,
  movies: [],
  tvShows: [],
  clickedCard: {},
  showDes: "",
  userWatchHistory: [],
  commentResponse: {},
  videoComments: null,
  likeResponse: {},
  aiRecommendationList: [],
};

export const fetchVideos = createAsyncThunk("/videos", async () => {
  const response: any = await await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}video/getAllVideos`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({})
    }
  );
  const data = await response.json();
  console.log(data, "data");
  return data.videos;
});

export const fetachMovies = createAsyncThunk(
  "/movies",
  async (arg: String, { dispatch }: any) => {
    const response: any = await await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}video/getAllMovies`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: arg }),
      }
    );
    const movieData = await response.json();
    dispatch(setMovies(movieData?.videos));
    console.log(movieData, "movieData");
    // console.log(data,"data")
    // return data.videos;
  }
);

export const fetchTvShows = createAsyncThunk(
  "/tvShows",
  async (arg: string, { dispatch }: any) => {
    const response: any = await await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}video/getAllTvShows`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: arg }),
      }
    );
    const showData = await response.json();
    dispatch(setTvShows(showData?.videos));
    console.log(showData, "showData");
    return showData.videos;
  }
);

export const fetchVideoDescription: any = createAsyncThunk(
  "ai/videoDescription",
  async (videoId: string, { rejectWithValue, dispatch }) => {
    try {
      //making get request to fetch videos from backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}ai/${videoId}/description`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      //if response is not ok, throw an error
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      //parse the json response
      const data = await response.json();
      //return the array of video objects from the api response
      dispatch(setShowDes(data?.description));
      return { videoId, data };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      //handles and returns errors if any
      return rejectWithValue(error?.message);
    }
  }
);

export const updateUserWatchHistory: any = createAsyncThunk(
  "video/updateWatchHistory",
  async (videoId: string, { rejectWithValue, dispatch }) => {
    try {
      //making get request to fetch videos from backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}video/watchHistory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            videoId: videoId,
          }),
        }
      );
      //if response is not ok, throw an error
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      //parse the json response
      const data = await response.json();

      return { videoId, data };
    } catch (error: any) {
      //handles and returns errors if any
      return rejectWithValue(error?.message);
    }
  }
);

export const getWatchHistory: any = createAsyncThunk(
  "video/getWatchHistory",
  async (_, { rejectWithValue, dispatch }: any) => {
    console.log("call>>");
    try {
      //making get request to fetch videos from backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}video/getWatchHistory`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      //if response is not ok, throw an error
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      //parse the json response
      const data = await response.json();
      //return the array of video objects from the api response
      dispatch(setUserWatchHistory(data?.watchHistory));
      // return { videoId, data };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      //handles and returns errors if any
      return rejectWithValue(error?.message);
    }
  }
);

export const addCommentToVideo: any = createAsyncThunk(
  "video/addComment",
  async (formData: any, { rejectWithValue, dispatch }: any) => {
    console.log("call>>");
    try {
      //making get request to fetch videos from backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}video/${formData?.videoId}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            text: formData?.text,
          }),
        }
      );
      //if response is not ok, throw an error
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      //parse the json response
      const data = await response.json();
      //return the array of video objects from the api response
      dispatch(setCommentResponse(data));
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      //handles and returns errors if any
      return rejectWithValue(error?.message);
    }
  }
);

export const getCommentVideo: any = createAsyncThunk(
  "video/getCommentVideo",
  async (videoId: any, { rejectWithValue, dispatch }: any) => {
    console.log("getCommentVideo>>");
    try {
      //making get request to fetch videos from backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}video/${videoId}/getComments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      //if response is not ok, throw an error
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      //parse the json response
      const data = await response.json();
      //return the array of video objects from the api response
      dispatch(setVideoComments(data));
      // return { videoId, data };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      //handles and returns errors if any
      return rejectWithValue(error?.message);
    }
  }
);

export const addLikeToVideo: any = createAsyncThunk(
  "video/addLike",
  async (videoId: String, { rejectWithValue, dispatch }: any) => {
    console.log("call>>");
    try {
      //making get request to fetch videos from backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}video/${videoId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      //if response is not ok, throw an error
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      //parse the json response
      const data = await response.json();
      //return the array of video objects from the api response
      dispatch(setLikeResponse(data));
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      //handles and returns errors if any
      return rejectWithValue(error?.message);
    }
  }
);

export const getAiRecommendationList: any = createAsyncThunk(
  "video/getAiRecommendationList",
  async (videoId: String, { rejectWithValue, dispatch }: any) => {
    console.log("call>>");
    try {
      //making get request to fetch videos from backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}ai/airecommended-movies`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      //if response is not ok, throw an error
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      //parse the json response
      const data = await response.json();
      //return the array of video objects from the api response
      dispatch(setAiRecommendationList(data?.videos));
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      //handles and returns errors if any
      return rejectWithValue(error?.message);
    }
  }
);

//Creation of Auth Slice with initial state and reducers
const movieSlice = createSlice({
  name: "moviesSlice",
  initialState,
  reducers: {
    setStoreMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    setShowDialog: (state, action) => {
      state.showDialog = action.payload;
    },
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setTvShows: (state, action) => {
      state.tvShows = action.payload;
    },
    setClickedcard: (state, action) => {
      state.clickedCard = action.payload;
    },
    setShowDes: (state, action) => {
      state.showDes = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserWatchHistory: (state, action) => {
      state.userWatchHistory = action.payload;
    },
    setCommentResponse: (state, action) => {
      state.commentResponse = action.payload;
    },
    // setVideoComments: (state, action) => {
    //   state.videoComments = action.payload;
    // },
    setVideoComments: (state, action: PayloadAction<VideoCommentsResponse>) => {
      state.videoComments = action.payload;
    },
    setLikeResponse: (state, action) => {
      state.likeResponse = action.payload;
    },
    setAiRecommendationList: (state, action) => {
      state.aiRecommendationList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        // state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.allVideos = action.payload; // Store the fetched users in state
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message; // Capture any error that occurred
      });
  },
});

export const {
  setStoreMovie,
  setShowDialog,
  setMovies,
  setTvShows,
  setClickedcard,
  setShowDes,
  setLoading,
  setUserWatchHistory,
  setCommentResponse,
  setVideoComments,
  setLikeResponse,
  setAiRecommendationList,
} = movieSlice.actions;

export default movieSlice.reducer;
