import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import { getCurrentUser } from "../../redux/action/loginAction/actions";

const EditPhoneNumber = () => {
  const { currentUser } = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();

  const { phoneNumber, id } = currentUser;

  const [editPhoneNumber, setEditPhoneNumber] = useState(false);

  const [phoneError, setPhoneError] = useState("");

  const [phoneValue, setphoneValue] = useState("");

  useEffect(() => {
    if (phoneNumber) setphoneValue(phoneNumber);
  }, [phoneNumber]);

  const handleEditName = () => {
    if (phoneValue) {
      firestore
        .collection("users")
        .doc(id)
        .update({
          phoneNumber: phoneValue,
        })
        .then(() => {
          dispatch(getCurrentUser(id));
          setPhoneError("");
          setEditPhoneNumber(false);
        })
        .catch((err) => setPhoneError(err.message));
    } else {
      setPhoneError("Please provide us your phone number");
    }
  };

  const renderPhoneNumber = () => {
    return (
      <div className="bg-white p-4 mb-5 rounded-md shadow-md">
        {phoneError && (
          <div className="bg-red-100 flex flex-row justify-between items-start mb-5 border border-red-200 border-solid text-red-800 p-5 w-full md:w-1/2">
            <p className="flex-grow">{phoneError}</p>
            <svg
              onClick={() => setPhoneError("")}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 bg-red-700 cursor-pointer text-white rounded-full  p-1"
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
        )}
        <h6 className="font-semibold mb-3">Phone number</h6>
        {editPhoneNumber ? (
          <div>
            <input
              value={phoneValue}
              onChange={(e) => setphoneValue(e.target.value)}
              className="border border-solid w-full md:w-1/2 focus:outline-none focus:ring-1 border-warmGray-200 p-3 rounded-md mb-3"
              placeholder="Phone number"
            />
            <div className="flex flex-row justify-start items-center">
              <button
                onClick={() => {
                  setPhoneError("");
                  setEditPhoneNumber(false);
                }}
                className="px-6 py-2 rounded-md text-indigo-500 hover:bg-indigo-500 hover:text-white focus:outline-none mr-3 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleEditName}
                className="px-6 py-2 rounded-md bg-indigo-500 hover:bg-indigo-400 focus:outline-none text-white cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-3 flex flex-row justify-between items-center font-light">
            <p>{phoneNumber}</p>
            <button
              onClick={() => setEditPhoneNumber(true)}
              className="text-indigo-400 cursor-pointer font-semibold"
            >
              {phoneNumber ? "Edit" : "Add"}
            </button>
          </div>
        )}
      </div>
    );
  };

  return renderPhoneNumber();
};

export default EditPhoneNumber;
