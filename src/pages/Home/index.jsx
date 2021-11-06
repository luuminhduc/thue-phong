import React from "react";
import { useSelector } from "react-redux";
import Banner from "../../components/Banner";
import ListOfPlaces from "../../components/ListOfPlaces";
import SearchPlaces from "../../components/SearchPlaces";

const Home = () => {
  const placeReducer = useSelector((state) => state.placeReducer);
  const { listOfPlaces } = placeReducer;

  return (
    <div>
      <div className="md:max-w-6xl mx-auto">
        <SearchPlaces />
        <Banner />
        <div className="my-20">
          {<ListOfPlaces cols={4} list={listOfPlaces} />}
        </div>
      </div>

      {/* <div className="mt-20 bg-warmGray-900 w-full p-5"></div> */}
    </div>
  );
};

export default Home;
