import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/action/loginAction/actions";

const Header = () => {
  const colors = ["red", "yellow", "green", "purple", "blue"];

  const { auth } = useSelector((state) => state.firebaseReducer);
  const { uid } = auth;

  const { currentUser } = useSelector((state) => state.loginReducer);

  const [block, setBlock] = useState(false);

  const [showToolKit, setShowToolKit] = useState(false);

  const toolKitArr = ["My bookings", "Profile", "Service", "History"];

  const dispatch = useDispatch();

  const renderToolKit = () => {
    return (
      <div
        className={`absolute z-10  transform transition-all ${
          showToolKit ? "block" : "hidden"
        } bg-white top-12 shadow-lg border border-solid border-gray-200 w-72 -left-32`}
      >
        <h3 className="bg-gray-50 py-3 px-6 uppercase text-xs ">My account</h3>
        <div className="p-3">
          {toolKitArr.map((el, i) => (
            <NavLink
              to={`/account/${el}`}
              className="p-3 block hover:bg-warmGray-100 hover:text-indigo-500 text-warmGray-700 text-sm"
              key={i}
            >
              {el}
            </NavLink>
          ))}
          <button
            onClick={() => dispatch(logout())}
            className="w-full mt-3 text-sm p-3 border border-solid rounded-md hover:bg-indigo-400 hover:text-white border-indigo-400 text-indigo-400"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  };

  const renderBlock = () => {
    const { userName } = currentUser;
    const firstLetter = userName.split("")[0];
    return (
      <div
        onClick={() => setShowToolKit(!showToolKit)}
        className="ml-5 relative hover:bg-warmGray-50 p-2 flex flex-row justify-center items-center cursor-pointer"
      >
        {renderToolKit()}
        <div className="flex flex-row justify-center items-center">
          <span className="uppercase rounded-full h-6 text-md w-6 flex justify-center items-center bg-yellow-500 text-white">
            {firstLetter}
          </span>
          <span>{userName}</span>
        </div>
        {showToolKit ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-purple-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-purple-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-row  p-3  justify-between items-center">
      <NavLink className="" to="/">
        <div className="flex flex-col justify-start items-center">
          <h3 className="font-light uppercase text-2xl">Rent</h3>
          <div className="flex flex-row justify-center items-center">
            {colors.map((el, i) => (
              <div
                key={i}
                className={`w-2 mr-0.5 h-2 rounded-full bg-${el}-500`}
              ></div>
            ))}
          </div>
        </div>
      </NavLink>

      <span className="block md:hidden" onClick={() => setBlock(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </span>

      <div
        className={`md:flex md:p-0 p-5 md:border-none border-l border-solid border-warmGray-200 md:static md:h-auto md:shadow-none bg-white md:bg-transparent flex-row justify-between items-center md:w-3/4 fixed top-0 right-0 w-1/2 h-screen ${
          block ? "block" : "hidden"
        }`}
      >
        <div className="mb-5 md:hidden flex flex-row justify-end items-center">
          <svg
            onClick={() => setBlock(false)}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex md:flex-row flex-col md:w-1/2 justify-center md:items-center items-start">
          <NavLink className="hover:text-indigo-400 mr-5 mb-2 md:mb-0" to="/">
            About
          </NavLink>
          <NavLink className="hover:text-indigo-400 mr-5 mb-2 md:mb-0" to="/">
            Jobs
          </NavLink>
          <NavLink className="hover:text-indigo-400 mr-5 mb-2 md:mb-0" to="/">
            News
          </NavLink>
          <NavLink className="hover:text-indigo-400 mr-5 mb-2 md:mb-0" to="/">
            Contact
          </NavLink>
        </div>
        <div className="flex md:flex-row flex-col justify-end md:items-center items-start">
          <NavLink to="/addPlace">
            <button className="border border-solid border-rose-400 p-2 hover:bg-rose-400 hover:text-white hover:border-white rounded-md text-rose-400">
              Add your place
            </button>
          </NavLink>

          {uid ? (
            currentUser && renderBlock()
          ) : (
            <div className="flex md:flex-row flex-col md:items-center items-start">
              <NavLink className="md:ml-3 mb-2 md:mb-0" to="/login">
                <button className=" p-2 hover:bg-indigo-400 hover:text-white hover:border-white rounded-md text-indigo-400">
                  Login
                </button>
              </NavLink>
              <NavLink className="md:ml-3 mb-2 md:mb-0" to="/register">
                <button className="border border-solid border-indigo-400 p-2 hover:bg-indigo-400 hover:text-white hover:border-white rounded-md text-indigo-400">
                  Register
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
