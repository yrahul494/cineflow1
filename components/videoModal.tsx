"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
import { AppDispatch } from "../redux/store";
import {
  addCommentToVideo,
  addLikeToVideo,
  getCommentVideo,
  setShowDialog,
  setStoreMovie,
  updateUserWatchHistory,
} from "../redux/slices/movieSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useRouter } from "next/navigation";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CommentIcon from "@mui/icons-material/Comment";
import ClipLoader from "react-spinners/ClipLoader";
import { Avatar, TextField, Tooltip } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { RootState } from '../redux/store';
import toast, { Toaster } from 'react-hot-toast';

interface ClickCard {
  _id: string;
  title?: string;
}

const VideoModal = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [items, setItems] = useState<ClickCard[]>([]);
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false);
  const [inputComment, setInputComment] = useState<string>("");
  
  const {
    showDialog,
    clickedCard,
    showDes,
    videoComments,
    likeResponse,
  } = useSelector((state:RootState) => state.movie);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      ReactModal.setAppElement('body');
    }
  }, []);

  useEffect(() => {
    const storedItems = localStorage.getItem("myLists");
    if (storedItems) {
      try {
        setItems(JSON.parse(storedItems)); 
      } catch (error) {
        console.error("Error parsing localStorage data", error);
        setItems([]); 
      }
    }
  }, []);

  const handleModal = () => {
    dispatch(updateUserWatchHistory(clickedCard?._id));
    dispatch(setShowDialog(!showDialog));
    router.push(`video/${clickedCard?._id}`);
    dispatch(setStoreMovie(clickedCard?.url));
  };

  const closeModal = () => {
    dispatch(setShowDialog(false));
  };

  const handleWatchList = (clickedCard:ClickCard) => {
    const isExist = items?.some((ele) => ele?._id == clickedCard?._id);
    if (!isExist) {
      const newArr = [...items, clickedCard];
      const updatedItems = newArr;
      setItems(updatedItems);
      localStorage.setItem("myLists", JSON.stringify(updatedItems));
      
      // Show success toast
      toast.success(`${clickedCard.title || 'Movie'} added to watchlist!`, {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#4CAF50', // Green background
          color: 'white',
          padding: '16px',
          borderRadius: '8px'
        }
      });
    } else {
      // Show info toast if movie is already in watchlist
      toast.error(`${clickedCard.title || 'Movie'} is already in your watchlist`, {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#FFA500', // Orange background
          color: 'white',
          padding: '16px',
          borderRadius: '8px'
        }
      });
    }

    dispatch(setShowDialog(false));
  };


  const handleComment = async () => {
    const commentData = {
      videoId: clickedCard?._id,
      text: inputComment,
    };
    const res = await dispatch(addCommentToVideo(commentData));
    if (res?.payload?.status == 200) {
      dispatch(getCommentVideo(clickedCard?._id));
    }
    setInputComment("");
  };

  const handleLike = () => {
    dispatch(addLikeToVideo(clickedCard?._id));
  };

  return (
    <div>
      {/* Add Toaster component to render toasts */}
      <Toaster />
      
      <ReactModal
        isOpen={showDialog}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        {showDialog ? (
          <div>
            <Card>
              <CardMedia
                sx={{ height: 250 }}
                image={clickedCard?.poster}
                title="movie"
                className="show-image"
              />
              <CardContent className="show-content">
                <div className="show-title">{clickedCard?.title}</div>
                <div className="show-des">
                  {showDes ||
                    clickedCard?.aiDescription ||
                    "Generating Description using AI...."}
                </div>
              </CardContent>
              <div className="show-data">
                <div className="show-actions">
                  <Tooltip title="Play Video">
                    <PlayCircleOutlineIcon
                      sx={{
                        color: "white",
                        height: "35px",
                        width: "35px",
                        zIndex: 999,
                      }}
                      onClick={handleModal}
                    />
                  </Tooltip>
                  <Tooltip title="Add to Watchlist">
                    <AddCircleOutlineIcon
                      sx={{ color: "white", height: "35px", width: "35px" }}
                      onClick={() => {
                        handleWatchList(clickedCard);
                      }}
                    />
                  </Tooltip>
                  {likeResponse?.likes == 0 ? (
                    <Tooltip title="Like">
                      <ThumbUpOffAltIcon
                        sx={{ color: "white", height: "35px", width: "35px" }}
                        onClick={handleLike}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Dislike">
                      <ThumbUpIcon
                        sx={{ color: "red", height: "35px", width: "35px" }}
                        onClick={handleLike}
                      />
                    </Tooltip>
                  )}
                  <Tooltip title="Add Comment" sx={{ color: "white" }}>
                    <CommentIcon
                      sx={{ color: "white", height: "35px", width: "35px" }}
                      onClick={() => {
                        dispatch(getCommentVideo(clickedCard?._id));
                        setShowCommentBox(true);
                      }}
                    />
                  </Tooltip>
                </div>
                <div className="show-info">
                  <FiberManualRecordIcon
                    sx={{
                      fontSize: "small",
                      color: "grey",
                      width: "0.7rem",
                      height: "0.7rem",
                    }}
                  />
                  <div style={{ color: "white", marginLeft: "-3px" }}>2025</div>
                  <FiberManualRecordIcon
                    sx={{
                      fontSize: "small",
                      color: "grey",
                      width: "0.7rem",
                      height: "0.7rem",
                    }}
                  />
                  <div style={{ color: "white", marginLeft: "-3px" }}>A</div>{" "}
                  <FiberManualRecordIcon
                    sx={{
                      fontSize: "small",
                      color: "grey",
                      width: "0.7rem",
                      height: "0.7rem",
                    }}
                  />
                  <div style={{ color: "white", marginLeft: "-3px" }}>
                    {clickedCard?.genre || "Thiller"}
                  </div>{" "}
                  <FiberManualRecordIcon
                    sx={{
                      fontSize: "small",
                      color: "grey",
                      width: "0.7rem",
                      height: "0.7rem",
                    }}
                  />
                  <div style={{ color: "white", marginLeft: "-3px" }}>
                    {clickedCard?.type || "Movie"}
                  </div>
                </div>
              </div>
              {showCommentBox ? (
                <div className="comment-section">
                  <div className="comment-title">{`Total Comments: ${videoComments?.result?.length}`}</div>
                  <div className="comment-merge">
                    <TextField
                      fullWidth
                      placeholder="Add Comment.."
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "red",
                            // color:"white"
                          },
                        },
                      }}
                      className="textfield"
                      onChange={(event) => {
                        setInputComment(event?.target.value);
                      }}
                    />
                    <div className="submit-parent">
                      <button className="moreInfoBtn" onClick={handleComment}>
                        {" "}
                        Submit
                      </button>
                    </div>
                  </div>
                  {videoComments && videoComments.result && videoComments.result.length > 0 && (
                    <div className="comment-parent">
                      {videoComments?.result &&
                        videoComments?.result?.map(
                          (ele, index: number) => (
                            <div className="comment-profile" key={index}>
                              <Avatar
                                alt={ele?.user.name}
                                src={ele?.user?.avatar}
                                sx={{ width: 56, height: 56 }}
                              />
                              <div className="profile-details">
                                {" "}
                                <Typography
                                  variant="h5"
                                  sx={{ color: "white" }}
                                >
                                  {ele?.user.name}
                                </Typography>
                                <Typography sx={{ color: "white" }}>
                                  {ele?.comment}
                                </Typography>
                              </div>
                            </div>
                          )
                        )}
                    </div>
                  )}
                </div>
              ) : (
                <></>
              )}
            </Card>
          </div>
        ) : (
          <ClipLoader />
        )}
      </ReactModal>
    </div>
  );
};

export default VideoModal;