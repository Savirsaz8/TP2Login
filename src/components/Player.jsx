
import React, { useEffect, useState } from "react";
import ReactPlayer from 'react-player';
import Modal from 'react-modal';
import axios from "axios";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '50%',
      height: '60%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

function Player({ children, media_type, id, movie_data }) {
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState();

  function openModal() {
    setOpen(true);
  }

  function beforeSetVideo(data) {
    setVideo(data.results[0]?.key);
  }

  function closeModal() {
    setOpen(false);
  }

  const fetchVideo = async () => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=ba8f4caa4e6ebec49f8c6b8ba603ed04&language=en-US`
    );
    beforeSetVideo(data);
  };

  useEffect(() => {
    fetchVideo();
    }, [fetchVideo]);

  return (
    <>
        <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={openModal}
        >
            {children}
        </div>
        <Modal
        isOpen={open}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
        size="lg"
        >
            <div className='player-wrapper'>
                <ReactPlayer
                className='react-player'
                url={'https://www.youtube.com/watch?v='+video}
                width='100%'
                />
            </div>
            <h3>{movie_data.title}</h3>
        </Modal>
    </>
  );

}

export default Player