import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNewPlace } from "../../../redux/action/placeAction/actions";
import { fileListToBase64 } from "../../../utilities/handleFile";

const ConfirmPlace = ({
  currentStep,
  setCurrentStep,
  newPlaceInfo,
  setNewPlaceInfo,
}) => {
  const onPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const { auth } = useSelector((state) => state.firebaseReducer);
  const { uid } = auth;

  const dispatch = useDispatch();

  const history = useHistory();

  const {
    size,
    target,
    city,
    district,
    ward,
    address,
    title,
    description,
    price,
    duration,
    deposit,
    photos,
  } = newPlaceInfo;

  const [clientPhotos, setClientPhotos] = useState([]);

  useEffect(() => {
    if (photos.length > 0) {
      fileListToBase64(photos).then((res) => setClientPhotos(res));
    }
  }, [photos]);

  const renderBtn = () => {
    return (
      <div className="flex mt-5 flex-row justify-end items-center">
        <button
          type="button"
          onClick={onPrevStep}
          disabled={currentStep <= 1 ? true : false}
          className={`px-6 py-2 rounded-md text-warmGray-500 bg-warmGray-200 focus:outline-none mr-3 ${
            currentStep <= 1 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() =>
            dispatch(addNewPlace({ ...newPlaceInfo, uid }, history))
          }
          className="px-6 py-2 rounded-md bg-cyan-600 hover:bg-cyan-700 focus:outline-none text-white cursor-pointer"
        >
          Confirm
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-5">
        <h4 className="uppercase font-bold">Basic info</h4>
        <div className="border border-solid grid md:grid-cols-2 gap-10 border-warmGray-200 p-3 rounded">
          <div>
            <p className="font-semibold">Size</p>
            <p className="bg-warmGray-100 p-2 rounded">{size}</p>
          </div>
          <div>
            <p className="font-semibold">Target</p>
            <p className="bg-warmGray-100 p-2 rounded">{target}</p>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h4 className="uppercase font-bold">Addess</h4>
        <div className="border border-solid grid md:grid-cols-2 gap-10 border-warmGray-200 p-3 rounded">
          <div>
            <p className="font-semibold">City</p>
            <p className="bg-warmGray-100 p-2 rounded">{city}</p>
          </div>
          <div>
            <p className="font-semibold">District</p>
            <p className="bg-warmGray-100 p-2 rounded">{district}</p>
          </div>
          <div>
            <p className="font-semibold">Ward</p>
            <p className="bg-warmGray-100 p-2 rounded">{ward}</p>
          </div>
          <div>
            <p className="font-semibold">Address</p>
            <p className="bg-warmGray-100 p-2 rounded">{address}</p>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h4 className="uppercase font-bold">Description</h4>
        <div className="border border-solid grid md:grid-cols-2 gap-10 border-warmGray-200 p-3 rounded">
          <div>
            <p className="font-semibold">Title</p>
            <p className="bg-warmGray-100 p-2 rounded">{title}</p>
          </div>
          <div>
            <p className="font-semibold">Description</p>
            <p className="bg-warmGray-100 p-2 rounded">{description}</p>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h4 className="uppercase font-bold">Price</h4>
        <div className="border border-solid grid md:grid-cols-2 gap-10 border-warmGray-200 p-3 rounded">
          <div>
            <p className="font-semibold">Duration</p>
            <p className="bg-warmGray-100 p-2 rounded">{duration}</p>
          </div>
          <div>
            <p className="font-semibold">Price</p>
            <p className="bg-warmGray-100 p-2 rounded">{price}$</p>
          </div>
          <div>
            <p className="font-semibold">Deposit</p>
            <p className="bg-warmGray-100 p-2 rounded">
              {deposit ? deposit : 0}$
            </p>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h4 className="uppercase font-bold">Photos</h4>
        <div className="border border-solid grid md:grid-cols-4 lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-10 border-warmGray-200 p-3 rounded">
          {clientPhotos.length > 0 &&
            clientPhotos.map((item, idx) => (
              <img alt={idx} key={idx} src={item} />
            ))}
        </div>
      </div>

      {renderBtn()}
    </div>
  );
};

export default ConfirmPlace;
