"use client";
import Image from "next/image";
// import styles from './HeroSection.module.css';
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import {
  setClickedcard,
  setLoading,
  setShowDialog,
  setStoreMovie,
} from "../redux/slices/movieSlice";
import { useRouter } from "next/navigation";
import { HeroData } from "../app/dashboard/page";
interface HeroSectionProps {
  data: HeroData;
}

const HeroSection = ({ data }:HeroSectionProps) => {
  // console.log(data, "data");
  const router = useRouter();
  const dispatch = useDispatch();
  const handleVideo = () => {
    dispatch(setStoreMovie(data?.videoUrl));
    // dis
    router.push(`video/${data?.urlName}`);
  };

  const handleInfo = () => {
    dispatch(setLoading(true));
    dispatch(setShowDialog(true));
    dispatch(
      setClickedcard({
        title: data?.title,
        type: data?.type,
        genre: data?.genre,
        poster: data?.image,
        aiDescription: data?.description,
      })
    );
  };
  return (
    <section className="hero">
      <motion.div
        className="overlay"
        initial={{ x: "-100%" }} // Initial position (off-screen to the left)
        animate={{ x: 0 }} // Animate to the normal position (x: 0)
        exit={{ x: "100%" }} // Optional: animate the element off-screen to the right when exiting
        transition={{
          type: "spring", // You can adjust the type of transition
          stiffness: 100, // Adjust the spring stiffness for bounce effect
          damping: 25, // Control the bounce effect
        }}
      >
        <div className="content">
          <h1 className="title">{data?.title}</h1>
          <p className="description">{data?.description}</p>
          <div className="buttons">
            <motion.button className="playBtn" onClick={handleVideo}>
              {" "}
              ▶ Watch Now
            </motion.button>
            <motion.button className="moreInfoBtn" onClick={handleInfo}>
              {" "}
              ℹ More Info
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Using Next.js Image component */}
      <div className="imageContainer ">
        <Image
          src={data?.image} // Replace with your image URL
          alt="Hero Background"
          layout="fill" // This makes the image cover the whole section
          objectFit="cover" // Ensures the image covers the area without distortion
          quality={100} // Set the quality to 100 for optimal image quality
          unoptimized
          style={{ top: "50px" }}
          
        />
      </div>
    </section>
  );
};

export default HeroSection;
