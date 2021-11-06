import React from "react";
import { NavLink } from "react-router-dom";

const AccountSideBar = () => {
  const toolKitArr = ["My bookings", "Profile", "Service", "History"];

  return (
    <div className="bg-white shadow-md w-full">
      <h3 className="p-3 font-bold uppercase">Account</h3>
      {toolKitArr.map((el, i) => (
        <NavLink
          to={`/account/${el}`}
          className={`p-3 flex hover:bg-gray-100 hover:text-indigo-400 cursor-pointer`}
          activeClassName="bg-indigo-100 text-indigo-400 hover:text-white hover:bg-indigo-100"
          key={i}
        >
          <span>{el}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default AccountSideBar;
