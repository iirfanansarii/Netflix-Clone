import React, { useState } from 'react';
import './listitem.scss';
<<<<<<< HEAD

=======
>>>>>>> 539c20c58391fdc8c68a0603ccffc94a81ff0b15
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from '@material-ui/icons';
<<<<<<< HEAD

=======
>>>>>>> 539c20c58391fdc8c68a0603ccffc94a81ff0b15
const ListItem = ({ index }) => {
  const [isHovered, setIsHovered] = useState();
  const trailer =
    'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761';
  return (
    <div
<<<<<<< HEAD
      className='listItem'
=======
      className="listItem"
>>>>>>> 539c20c58391fdc8c68a0603ccffc94a81ff0b15
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
    >
      <img
<<<<<<< HEAD
        src='https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/4290/754290-h'
        alt=''
      />
      {isHovered && (
        <>
          <video muted={false} src={trailer} autoPlay={true} loop />
          <div className='itemInfo'>
            <div className='icons'>
              <PlayArrow className='icon' />
              <Add className='icon' />
              <ThumbUpAltOutlined className='icon' />
              <ThumbDownOutlined className='icon' />
            </div>
            <div className='itemTopInfo'>
              <span>1 hour 40 minutes</span>
              <span className='limit'>+16</span>
              <span>2021</span>
            </div>
            <div className='desc'>
=======
        src="https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/4290/754290-h"
        alt=""
      />
      {isHovered && (
        <>
          <video src={trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemTopInfo">
              <span>1 hour 40 minutes</span>
              <span className="limit">+16</span>
              <span>2021</span>
            </div>
            <div className="desc">
>>>>>>> 539c20c58391fdc8c68a0603ccffc94a81ff0b15
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga
              maiores ducimus dignissimos eum aliquam reprehenderit beatae
              susci.
            </div>
<<<<<<< HEAD
            <div className='genre'>Action</div>
=======
            <div className="genre">Action</div>
>>>>>>> 539c20c58391fdc8c68a0603ccffc94a81ff0b15
          </div>
        </>
      )}
    </div>
  );
};

export default ListItem;
