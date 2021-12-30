import { useState, useEffect } from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import './featured.scss';
import httpService from '../../api/httpServices';

const Featured = ({ type }) => {
  const [content, setContent] = useState();

  useEffect(() => {
    httpService
      .get('/random/movie', { params: { type: type } })
      .then((res) => {
        setContent(res.data.movie);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [type]);

  console.log('content', content && content[0].img);

  return (
    <div className='featured'>
      {type && (
        <div className='category'>
          <span> {type === 'movies' ? 'Movies' : 'Series'}</span>
          <select name='genre' id='genre'>
            <option value='genre'>Genre</option>
            <option value='adventure'>Adventure</option>
            <option value='comedy'>Comedy</option>
            <option value='crime'>Crime</option>
            <option value='fantasy'>Fantasy</option>
            <option value='historical'>Historical</option>
            <option value='horror'>Horror</option>
            <option value='romance'>Romance</option>
            <option value='sci-fi'>Sci-fi</option>
            <option value='thriller'>Thriller</option>
            <option value='western'>Western</option>
            <option value='animation'>Animation</option>
            <option value='drama'>Drama</option>
            <option value='documentary'>Documentary</option>
          </select>
        </div>
      )}
      <img src={content && content[0].img} alt='' />
      <div className='info'>
        <img src={content && content[0].img} alt='' />
        <span className='desc'>{content && content[0].desc}</span>
        <div className='buttons'>
          <button className='play'>
            <PlayArrowIcon />
            <span>Play</span>
          </button>
          <button className='more'>
            <InfoOutlinedIcon />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
