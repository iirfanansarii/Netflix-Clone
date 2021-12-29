import { useState, useEffect } from 'react';
import Featured from '../../components/featured/Featured';
import Navbar from '../../components/navbar/Navbar';
import List from '../../components/list/List';
import './home.scss';
import httpService from '../../api/httpServices';

const Home = ({ types }) => {
  const [lists, setLists] = useState([]);
  const [type, setType] = useState('series');
  const [genre, setGenre] = useState('action');

  useEffect(() => {
    httpService
      .get('/lists', {
        params: { type: type, genre: genre },
      })
      .then((res) => {
        setLists(res.data.lists);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='home'>
      <Navbar />
      <Featured type={types} />
      {lists && lists.map((list) => <List list={list} />)}
      {lists && lists.map((list) => <List list={list} />)}
      {lists && lists.map((list) => <List list={list} />)}
      {lists && lists.map((list) => <List list={list} />)}
    </div>
  );
};

export default Home;
