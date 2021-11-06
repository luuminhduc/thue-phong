import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../redux/action/modalAction/actions";

const Modal = () => {
  const { active, title, content, callback } = useSelector(
    (state) => state.modalReducer
  );

  const dispatch = useDispatch();

  const handleOk = () => {
    if (callback) {
      callback();
    }
    dispatch(hideModal());
  };

  return active ? (
    <div className="fixed p-3 md:px-0 z-40 top-0 left-0 w-screen h-screen bg-black bg-opacity-60 flex justify-center items-center">
      <div className="w-full md:max-w-3xl bg-white rounded-md p-5">
        <h2 className="text-2xl font-bold text-warmGray-700">{title}</h2>
        <p className="mb-3">{content}</p>
        <div className="flex flex-row justify-end items-center">
          {callback && (
            <button
              onClick={() => dispatch(hideModal())}
              className="bg-warmGray-200 px-4 py-2 rounded-md cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleOk}
            className="px-4 py-2 bg-blue-400 ml-3 text-white hover:bg-blue-300 focus:outline-none rounded-md cursor-pointer"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Modal;
