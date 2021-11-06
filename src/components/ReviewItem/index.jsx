import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchSingleUser } from "../../utilities/asyncHelp";

const ReviewItem = ({ item }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (item) {
      fetchSingleUser(item.uid).then((res) => {
        setUser(res);
      });
    }
  }, [item]);

  const getTime = (time) => {
    const date = time.toDate();
    return (
      <p className="text-warmGray-400">
        Review was posted on {date.getDate()}/{date.getMonth() + 1}/
        {date.getFullYear()}
      </p>
    );
  };

  const renderUser = () => {
    return (
      <div className="text-sm md:w-1/4 w-full flex flex-row justify-start items-center md:block">
        <p className="text-blue-400 text-4xl mb-1 font-semibold">
          {item.rating}
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 inline-block ml-1 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </span>
        </p>

        <h6>{user.userName}</h6>
      </div>
    );
  };

  return (
    <div className="md:flex md:flex-row mb-5 justify-start items-start">
      {user && renderUser()}
      <div className="md:w-3/4 w-full bg-warmGray-100 md:ml-5 p-10 rounded-md">
        <h3 className="font-bold mb-5 text-warmGray-700">{item.title}</h3>
        <p className="mb-5">{item.content}</p>
        {item.time && getTime(item.time)}
      </div>
    </div>
  );
};

export default ReviewItem;
