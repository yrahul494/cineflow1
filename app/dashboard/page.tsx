"use client"; //Ensures the component runs in the browsers, important for redux and hooks

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../../components/HeroSection";
import CardSlider from "../../components/CardSlider";
// import MovieRow from "../../components/MovieRow";
import { RootState, AppDispatch } from "../../redux/store";
import {
  fetchVideos,
  getAiRecommendationList,
  getWatchHistory,
} from "../../redux/slices/movieSlice";
import Head from "next/head";

export interface Allvideo {

  aiDescription : string
  genre:string;
 poster:string
  title:string;
  type:string
  url:string
  _id:string;
}

export interface HeroData {
  videoUrl: string;
  urlName: string;
  title: string;
  type: string;
  genre: string;
  image: string;
  description: string;

}

export default function Dashboard() {

  //dispatches an action the redux store
  const dispatch: AppDispatch = useDispatch();
  const { allVideos, userWatchHistory, aiRecommendationList } = useSelector(
    (state: RootState) => state.movie
  );
  // console.log(allVideos, "videos");
  //fetch movies when the component mounts
  useEffect(() => {
    dispatch(fetchVideos());
    dispatch(getWatchHistory());
    dispatch(getAiRecommendationList());
  }, []);

  const featuredMovie :HeroData = {
    urlName: "Avatar",
    title: "Stranger Things: The Way of shadows",
    type: "movie",
    genre: "sifi-thiller",
    image:
      "https://cineflow-bucket.s3.eu-north-1.amazonaws.com/poster/1741755787909-stranger+things.jpg",
    videoUrl:
      "https://cineflow-bucket.s3.eu-north-1.amazonaws.com/videos/1741755770490-stranger-things.mp4",   description:
      "When a young boy vanishes, a small town unearths a sinister mystery. Demogorgons stalk the night, a girl with uncanny abilities emerges, and a portal to a terrifying dimension threatens to consume everything. Can a group of kids save their friend and reality itself before it's too late?\n",
  };

  const allMovies = allVideos?.filter((ele) => {
    return ele?.type == "movie";
  });

  const allTvShows = allVideos?.filter((ele) => {
    return ele?.type == "tv shows";
  });
  console.log(aiRecommendationList, "aiRecommendationList");

  return (
    <>
      <Head>
        <title>My Custom Page Title</title>
      </Head>
      <div className="bg-black text-white min-h-screen">
        {/* <Navbar /> */}
        <HeroSection data={featuredMovie} />
        <div className="trending-head">Trending Now</div>
        <CardSlider allVideos={allVideos} />
        {userWatchHistory?.length > 3 && (
          <>
            <div className="trending-head">continue watching...</div>
            <CardSlider allVideos={userWatchHistory} />
          </>
        )}
        {aiRecommendationList && aiRecommendationList?.length > 0 && (
          <>
            <div className="trending-head">Ai Recommendation List </div>
            <CardSlider allVideos={aiRecommendationList} />
          </>
        )}
        {allMovies && (
          <>
            <div className="trending-head">Binge Worty movies</div>
            <CardSlider allVideos={allMovies} />
          </>
        )}

        {allTvShows && (
          <>
            <div className="trending-head">Critically Acclaimed Tv Shows </div>
            <CardSlider allVideos={allTvShows} />
          </>
        )}
      </div>
    </>
  );
}
