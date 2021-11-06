import React from "react";
import { useSelector } from "react-redux";
import EditPhoneNumber from "../EditPhoneNumber";
import EditUserName from "../EditUserName";

const EditProfile = () => {
  const { currentUser } = useSelector((state) => state.loginReducer);
  const { email } = currentUser;

  const userEmail = () => {
    return (
      <div className="bg-white mb-5 p-4 rounded-md shadow-md">
        <h6 className="font-semibold">Email</h6>
        <div className="mt-3 flex flex-row justify-start item-center font-light">
          <p>{email}</p>
          <span className="ml-3 bg-green-400 text-white px-2 py-0.5 rounded-md text-sm">
            verified
          </span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <EditUserName />
      {userEmail()}
      <EditPhoneNumber />
    </div>
  );
};

export default EditProfile;
