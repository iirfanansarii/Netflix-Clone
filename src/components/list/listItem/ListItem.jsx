import React, { useState, useEffect } from 'react';
import httpService from '../../../api/httpServices';
import { Link } from 'react-router-dom';
import './listitem.scss';

import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from '@material-ui/icons';

const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    httpService
      .get(`/movie/${item}`)
      .then((res) => {
        setMovie(res.data.movie);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [item]);

  return (
    <Link to='/watch' state={{ movie: movie }}>
      <div
        className='listItem'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      >
        <img src={movie.img} alt='movie' />
        {isHovered && (
          <>
            <video muted={false} src={movie.trailer} autoPlay={true} loop />
            <div className='itemInfo'>
              <div className='icons'>
                <PlayArrow className='icon' />
                <Add className='icon' />
                <ThumbUpAltOutlined className='icon' />
                <ThumbDownOutlined className='icon' />
              </div>
              <div className='itemTopInfo'>
                <span>{movie.duration}</span>
                <span className='limit'>+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className='desc'>{movie.desc}</div>
              <div className='genre'>{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
