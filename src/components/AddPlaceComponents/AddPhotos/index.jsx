import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { fileListToBase64 } from "../../../utilities/handleFile";

const AddPhotos = ({
  currentStep,
  setCurrentStep,
  newPlaceInfo,
  setNewPlaceInfo,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },

    watch,
  } = useForm();

  const [filePhotosArr, setFilePhotosArr] = useState([]);

  const [fileArr, setFileArr] = useState([]);

  const onNextStep = (data) => {
    setNewPlaceInfo({ ...newPlaceInfo, photos: fileArr });
    setCurrentStep(currentStep + 1);
  };

  useEffect(() => {
    if (newPlaceInfo.photos.length > 0) {
      setFileArr(newPlaceInfo.photos);
    }
  }, [newPlaceInfo]);

  const onPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const watchPhotos = watch("photos");

  useEffect(() => {
    if (watchPhotos?.length > 0) {
      const arr = [...fileArr];

      for (let i = 0; i < watchPhotos.length; i++) {
        arr.push(watchPhotos[i]);
      }
      setFileArr(arr);
    }
    // eslint-disable-next-line
  }, [watchPhotos]);

  console.log("Fd");

  useEffect(() => {
    if (fileArr.length > 0) {
      fileListToBase64(fileArr).then((res) => {
        setFilePhotosArr(res);
      });
    } else {
      setFilePhotosArr([]);
    }
  }, [fileArr]);

  const deletePhoto = (idx) => {
    console.log(idx);
    const arr = [...fileArr];
    arr.splice(idx, 1);
    setFileArr(arr);
  };

  const fileImg = () => {
    return (
      <div className="overflow-hidden relative w-36 cursor-pointer">
        <button
          className={`border cursor-pointer border-solid ${
            errors.photos ? "border-red-500" : "border-coolGray-300"
          } py-3 w-full text-sm rounded text-coolGray-400 cursor-pointer`}
        >
          Add photos
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 inline-block w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>
        <input
          accept="image/*"
          {...register("photos", {
            required: fileArr.length > 0 ? false : true,
          })}
          className={`cursor-pointer absolute top-0 left-0 opacity-0 w-full h-full pin-r pin-t`}
          type="file"
          multiple
        />
        {errors.photos && (
          <small className="text-red-500 text-sm">Please add photos</small>
        )}
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit((data) => onNextStep(data))}>
        <div className="flex flex-col justify-start items-start mb-3">
          {fileImg()}

          <div className="mt-5 mb-5 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8">
            {filePhotosArr.length > 0 &&
              filePhotosArr.map((item, idx) => (
                <div key={idx}>
                  <img src={item} alt="" className="w-full" />
                  <div
                    onClick={() => deletePhoto(idx)}
                    className="text-center cursor-pointer p-1 bg-warmGray-200 rounded-b"
                  >
                    Delete
                  </div>
                </div>
              ))}
          </div>
        </div>

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
            type="submit"
            className="px-6 py-2 rounded-md bg-cyan-600 hover:bg-cyan-700 focus:outline-none text-white cursor-pointer"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPhotos;
