import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddBasicInfo = ({
  currentStep,
  setCurrentStep,
  newPlaceInfo,
  setNewPlaceInfo,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { size, target, propertyType } = newPlaceInfo;

  const onPrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    setValue("size", size);
    setValue("target", target);
  }, [size, target, propertyType, setValue]);

  const onNextStep = (data) => {
    setNewPlaceInfo({ ...newPlaceInfo, size: data.size, target: data.target });
    if (propertyType) setCurrentStep(currentStep + 1);
  };

  const typeArr = ["Home", "Room"];

  return (
    <form onSubmit={handleSubmit((data) => onNextStep(data))}>
      <div>
        <div className="flex flex-col justify-start items-start mb-3">
          <label className="font-semibold">Property type</label>
          <small>Click to chose the type of your property</small>
          <div className="flex flex-row justify-start items-center">
            {typeArr.map((el, i) => (
              <div
                onClick={() =>
                  setNewPlaceInfo({ ...newPlaceInfo, propertyType: el })
                }
                key={i}
                className={`${
                  propertyType === el
                    ? "bg-cyan-600 text-white"
                    : "text-warmGray-500"
                } px-6 mr-3 py-4  hover:bg-cyan-600 hover:text-white cursor-pointer hover:border-cyan-600 mt-3 rounded flex flex-col justify-center items-center-md border border-solid border-warmGray-200`}
              >
                {el === "Home" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-9 w-9"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-9 w-9"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                )}

                <p>{el}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-start items-start mb-3">
          <label className="font-semibold">Size</label>
          <small>The size of your place</small>
          <input
            type="number"
            {...register("size", { required: true })}
            className={`border border-solid   p-2 ${
              errors.size
                ? "border-red-400"
                : "border-warmGray-200 focus:ring-1"
            } focus:outline-none`}
          />
        </div>
        <div className="flex flex-col justify-start items-start mb-3">
          <label className="font-semibold">Target</label>
          <small>Your target</small>
          <select
            {...register("target", { required: true })}
            className={`border border-solid   p-2 ${
              errors.target
                ? "border-red-400"
                : "border-warmGray-200 focus:ring-1"
            } focus:outline-none`}
          >
            <option>Male</option>
            <option>Female</option>
            <option>All</option>
          </select>
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
  );
};

export default AddBasicInfo;
