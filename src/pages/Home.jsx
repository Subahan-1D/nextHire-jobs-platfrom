import Carousel from "../components/Banner/Carousel";
import TabCategories from "../components/Tab/TabCategories";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const jobs = useLoaderData();
  console.log(jobs);
  return (
    <div>
      <Carousel></Carousel>
      <TabCategories jobs={jobs}></TabCategories>
    </div>
  );
};

export default Home;
