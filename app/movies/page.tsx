"use client"
import React,{useEffect} from 'react'
// import Navbar from '../../components/Navbar'
import HeroSection from '../../components/HeroSection'
import CardSlider from '../../components/CardSlider'
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import{fetachMovies} from "../../redux/slices/movieSlice"
import { HeroData } from '../dashboard/page';

const Movies = () => {
  const dispatch: AppDispatch = useDispatch();
  const {movies} = useSelector((state:RootState)=>state.movie)
  const featuredMovie:HeroData = {
    urlName:"jurasic-world",
    title: "Jurasic World",
    image: "https://cineflow-bucket.s3.eu-north-1.amazonaws.com/poster/jurassic-world.jpg",
    videoUrl:"https://cineflow-bucket.s3.eu-north-1.amazonaws.com/videos/Jurassic+World.mp4",
    description: "Where Dinosaurs Roam, Adventure Awaits at Every Turn",
     genre:"Thiller",
    type:"movie"
  };

    useEffect(() => {
      dispatch(fetachMovies("movie"));
    }, []);
  return (
     <>
      <div className="bg-black text-white min-h-screen">
      {/* <Navbar /> */}
      <HeroSection data={featuredMovie}/>
      <div className="trending-head">Trending Now</div>
      <CardSlider allVideos={movies}/>
    </div>
     </>
  )
}

export default Movies