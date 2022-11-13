//embedvideo.jsx

import React from "react";
import ReactPlayer from "react-player";
import "../../assets/css/embedvideo.css";

const Embedvideo = (props) => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url={props.url}
        width="70%"
        height="100%"
      />
    </div>
  );
};

export default Embedvideo;
