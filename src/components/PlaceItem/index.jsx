import React from "react";
import { NavLink } from "react-router-dom";

const PlaceItem = ({ item }) => {
  const { photos, title, city, district, price, duration, size } = item;
  return (
    <NavLink to={`/place/${item.id}`}>
      <div className="cursor-pointer mx-auto w-3/4 sm:w-full transform hover:scale-105">
        <img className="my-1 rounded-sm" src={photos[0]} alt="" />
        <h2 className="text-warmGray-700 tracking-wide text-sm my-1">
          {title}
        </h2>
        <div className="text-indigo-400  text-xs my-1">
          <div className="inline-block">
            {[1, 2, 3, 4, 5].map((el) => (
              <svg
                key={el}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 inline-block text-rose-400 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-2">
            {district} {city}
          </span>
          <span className="ml-1">({size}m)</span>
        </div>

        <p className="my-1 text-xs text-warmGray-500">
          Gia moi {duration === "monthly" ? "Thang" : "Dem"} re nhat tu
        </p>
        <p className="my-1 text-rose-500 text-2xl">{price} $</p>
      </div>
    </NavLink>
  );
};

export default PlaceItem;
