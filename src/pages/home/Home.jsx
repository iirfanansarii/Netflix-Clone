import Chart from "../../components/charts/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import {userData} from "../../constants/dummydata";

const Home = () => {
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart title="User Analytics" data={userData} dataKey="Active User" grid />
   <div className="homeWidgets">
homeWidgets
   </div>
    </div>
  );
};

export default Home;
