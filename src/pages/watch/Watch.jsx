import React from 'react';
import './watch.scss';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import { Link, useLocation } from 'react-router-dom';

const Watch = () => {
  const location = useLocation();

  return (
    <div className='watch'>
      <Link to='/'>
        <div className='back'>
          <ArrowBackOutlinedIcon />
          Home
        </div>
      </Link>
      <video
        className='video'
        autoPlay
        progress='true'
        controls
        src={location.state.movie.trailer}
      ></video>
    </div>
  );
};

export default Watch;
