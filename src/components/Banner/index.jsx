import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Banner = () => {
  const { listOfPlaces } = useSelector((state) => state.placeReducer);

  const calculate = (name) => {
    const num = listOfPlaces.filter((el) => el.city === name)?.length;
    return <p className="text-warmGray-400 text-xs">{num} places</p>;
  };

  const arr = [
    {
      name: "Ha Noi",
      img: "https://pix6.agoda.net/geo/city/2758/1_2758_02.jpg?s=345x345&ar=1x1",
      url: "Thành phố Hà Nội",
    },
    {
      name: "Ho Chi Minh",
      img: "https://pix6.agoda.net/geo/city/13170/1_13170_02.jpg?s=345x345&ar=1x1",
      url: "Thành phố Hồ Chí Minh",
    },
    {
      name: "Đà Nẵng",
      img: "https://pix6.agoda.net/geo/city/16440/1_16440_02.jpg?s=345x345&ar=1x1",
      url: "Thành phố Đà Nẵng",
    },
  ];
  return (
    <div className="my-20 text-center">
      <h2 className="font-light tracking-wider text-2xl my-5 leading-5">
        Best places in Viet Nam
      </h2>
      <div className="flex flex-row justify-center items-center">
        {arr.map((item, idx) => (
          <NavLink
            key={idx}
            onClick={() => window.scrollTo(0, 0)}
            to={`/search?c=${item.url}`}
          >
            <div className="mx-10 transform hover:scale-105 text-center">
              <img src={item.img} className="w-36 my-1 rounded-full" alt="" />
              <p className="my-1 text-warmGray-700 text-sm font-bold">
                {item.name}
              </p>
              {calculate(item.url)}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Banner;
