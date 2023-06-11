import React, { useState } from 'react';

interface VideoComponentProps {}

const VideoComponent: React.FC<VideoComponentProps> = () => {
    const [videoPlaying, setVideoPlaying] = useState(false);

    const hide = () => {
        setVideoPlaying(false);
    };

    return (
            <div style={{width: "100%", height: "80%", background: "green"}}>
                <iframe
                    className="fvideo-player"
                    src="https://www.youtube.com/embed/qVdPh2cBTN0"
                    allowFullScreen
                    style={{width: "100%", height: "100%"}}
                ></iframe>
                <button className="faction faction--close" onClick={hide}>
                    <i className="fa fa-close"></i>
                    <span className="faction__label faction__label--hidden">Close preview</span>
                </button>
            </div>
    );
};
export default VideoComponent;
