import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import pagePath from '../../constants/pagepath';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
      <div className='container'>
        <div className='left'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png'
            alt=''
          />
          <Link to={pagePath.defaultPath} className='link'>
            <span>Homepage</span>
          </Link>
          <Link to={pagePath.series} className='link'>
            <span>Series</span>
          </Link>
          <Link to={pagePath.movies} className='link'>
            <span>Movies</span>
          </Link>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className='right'>
          <SearchIcon className='icon' />
          <span>KID</span>
          <NotificationsIcon className='icon' />
          <img
            src='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
            alt='profileimg'
          />
          <div className='profile'>
            <ArrowDropDownIcon className='icon' />
            <div className='options'>
              <span>Setting</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
