import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddDescription = ({
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

  useEffect(() => {
    if (newPlaceInfo.title) {
      setValue("title", newPlaceInfo.title);
    }
    if (newPlaceInfo.description) {
      setValue("description", newPlaceInfo.description);
    }
  }, [newPlaceInfo, setValue]);

  const onNextStep = (data) => {
    const { title, description } = data;
    setNewPlaceInfo({ ...newPlaceInfo, title, description });
    setCurrentStep(currentStep + 1);
  };

  const onPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit((data) => onNextStep(data))}>
        <div className="flex flex-col justify-start items-start mb-3">
          <label className="font-semibold">Title</label>
          <small>The main title of your post</small>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="VD: Can ho sat bien"
            className={`border border-solid w-full  p-2 ${
              errors.title
                ? "border-red-400"
                : "border-warmGray-200 focus:ring-1"
            } focus:outline-none`}
          />
          {errors.title && (
            <small className="text-red-500 text-sm">Invalid title</small>
          )}
        </div>
        <div className="flex flex-col justify-start items-start mb-3">
          <label className="font-semibold">Description</label>
          <small>Describe your property as specifically as possible</small>
          <textarea
            rows="5"
            type="text"
            {...register("description", { required: true })}
            className={`border border-solid w-full  p-2 ${
              errors.description
                ? "border-red-400"
                : "border-warmGray-200 focus:ring-1"
            } focus:outline-none`}
          />
          {errors.description && (
            <small className="text-red-500 text-sm">Invalid description</small>
          )}
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

export default AddDescription;
