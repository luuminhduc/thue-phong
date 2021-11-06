import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddPrice = ({
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
    if (newPlaceInfo.title) setValue("title", newPlaceInfo.title);
    if (newPlaceInfo.desciption)
      setValue("description", newPlaceInfo.desciption);
  }, [newPlaceInfo, setValue]);

  const onNextStep = (data) => {
    const { price, deposit } = data;
    setNewPlaceInfo({ ...newPlaceInfo, price, deposit });
    setCurrentStep(currentStep + 1);
  };

  const onPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    setValue("price", newPlaceInfo.price);
    setValue("deposit", newPlaceInfo.deposit);
  }, [newPlaceInfo, setValue]);

  return (
    <div>
      <form onSubmit={handleSubmit((data) => onNextStep(data))}>
        <div className="flex flex-col justify-start items-start mb-3">
          <label className="font-semibold">Payment duaration</label>
          <small>Do you charge your property monthly or daily</small>
          <div className="flex flex-row justify-start items-center mt-3">
            <div className="flex flex-row justify-start items-center mr-5">
              <input
                onChange={(e) =>
                  setNewPlaceInfo({ ...newPlaceInfo, duration: "monthly" })
                }
                checked={newPlaceInfo.duration === "monthly" ? true : false}
                value="monthly"
                className="mr-1"
                type="radio"
                name="duration"
              />

              <small>Monthly</small>
            </div>
            <div className="flex flex-row justify-start items-center mr-5">
              <input
                onChange={(e) =>
                  setNewPlaceInfo({ ...newPlaceInfo, duration: "daily" })
                }
                checked={newPlaceInfo.duration === "daily" ? true : false}
                value="daily"
                className="mr-1"
                type="radio"
                name="duration"
              />

              <small>Daily</small>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start mb-3">
          <label className="font-semibold">
            Price ({`${newPlaceInfo.duration}`})
          </label>
          <small>How much does your property cost in $</small>
          <input
            type="number"
            {...register("price", { required: true, min: 1 })}
            className={`border border-solid   p-2 ${
              errors.price
                ? "border-red-400"
                : "border-warmGray-200 focus:ring-1"
            } focus:outline-none`}
          />
          {errors.price && (
            <small className="text-red-500 text-sm">Invalid Price</small>
          )}
        </div>
        <div className="flex flex-col justify-start items-start mb-3">
          <label className="font-semibold">Deposit(optional)</label>
          <small>Tien coc</small>
          <input
            type="number"
            {...register("deposit", { min: 1 })}
            className={`border border-solid   p-2 ${
              errors.deposit
                ? "border-red-400"
                : "border-warmGray-200 focus:ring-1"
            } focus:outline-none`}
          />
          {errors.deposit && (
            <small className="text-red-500 text-sm">Invalid Deposit</small>
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

export default AddPrice;
