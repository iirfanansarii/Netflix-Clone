import Featured from '../../components/featured/Featured';
import Navbar from '../../components/navbar/Navbar';
import List from '../../components/list/List';
import './home.scss';

<<<<<<< HEAD
const Home = ({ type }) => {
  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} />
=======
const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Featured />
>>>>>>> 539c20c58391fdc8c68a0603ccffc94a81ff0b15
      <List />
      <List />
      <List />
      <List />
    </div>
  );
};

export default Home;
