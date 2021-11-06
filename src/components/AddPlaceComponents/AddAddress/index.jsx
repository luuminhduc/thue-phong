import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AddAddress = ({
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
    watch,
  } = useForm();

  const { vietNamInfo } = useSelector((state) => state.placeReducer);

  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  // Watch
  const watchCity = watch("city");
  const watchDistrict = watch("district");

  const onPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onNextStep = (data) => {
    const { city, district, ward, address } = data;
    setNewPlaceInfo({ ...newPlaceInfo, city, district, ward, address });
    setCurrentStep(currentStep + 1);
  };

  // Moi vao set city
  useEffect(() => {
    if (vietNamInfo?.length > 0) {
      // Neu da co value thi setValue ko thi set item dau tien cua vienNameInfo
      if (newPlaceInfo.city) {
        setValue("city", newPlaceInfo.city);
      } else {
        setValue("city", vietNamInfo[0].name);
      }
    }
  }, [newPlaceInfo, vietNamInfo, setValue]);

  // set district
  useEffect(() => {
    if (districtList?.length > 0) {
      if (watchCity === newPlaceInfo.city && newPlaceInfo.district) {
        setValue("district", newPlaceInfo.district);
      } else {
        setValue("district", districtList[0].name);
      }
    }
  }, [newPlaceInfo, districtList, watchCity, setValue]);

  // Set districtList sau khi da~ co value cua watch("city")
  useEffect(() => {
    if (watchCity && vietNamInfo?.length > 0) {
      const list = vietNamInfo.find((el) => el.name === watchCity);
      setDistrictList(list.districts);
    }
  }, [watchCity, vietNamInfo]);

  // Set wardList sau khi da~ co value cua watch("district");
  useEffect(() => {
    if (watchDistrict && districtList?.length > 0) {
      setWardList(districtList.find((el) => el.name === watchDistrict)?.wards);
    }
  }, [watchDistrict, districtList]);

  useEffect(() => {
    if (wardList?.length > 0) {
      if (watchDistrict === newPlaceInfo.district && newPlaceInfo.ward) {
        setValue("ward", newPlaceInfo.ward);
      } else {
        setValue("ward", wardList[0].name);
      }
    }
  }, [wardList, newPlaceInfo, watchDistrict, setValue]);

  useEffect(() => {
    if (newPlaceInfo.address) setValue("address", newPlaceInfo.address);
  }, [newPlaceInfo, setValue]);

  return (
    <div>
      <form onSubmit={handleSubmit((data) => onNextStep(data))}>
        <div className="flex flex-col justify-start items-start mb-3">
          <label className="font-semibold">City</label>
          <small>Which city is the property located</small>
          <select
            {...register("city", { required: true })}
            className={`border border-solid  p-2 ${
              errors.city
                ? "border-red-400"
                : "border-warmGray-200 focus:ring-1"
            } focus:outline-none`}
          >
            {vietNamInfo?.length > 0 &&
              vietNamInfo.map((item, idx) => (
                <option key={idx}>{item.name}</option>
              ))}
          </select>
        </div>

        <div className="flex flex-col justify-start items-start mb-3">
          <label className="font-semibold">District</label>
          <small>Which district is the property located</small>
          <select
            {...register("district", { required: true })}
            className={`border border-solid  p-2 ${
              errors.district
                ? "border-red-400"
                : "border-warmGray-200 focus:ring-1"
            } focus:outline-none`}
          >
            {districtList?.length > 0 &&
              watch("city") &&
              districtList?.map((item, idx) => (
                <option key={idx}>{item.name}</option>
              ))}
          </select>
        </div>

        <div className="flex flex-col justify-start items-start mb-3">
          <label className="font-semibold">Ward</label>
          <small>Which Ward is the property located</small>
          <select
            {...register("ward", { required: true })}
            className={`border border-solid  p-2 ${
              errors.ward
                ? "border-red-400"
                : "border-warmGray-200 focus:ring-1"
            } focus:outline-none`}
          >
            {wardList?.length > 0 &&
              watch("district") &&
              wardList?.map((item, idx) => (
                <option key={idx}>{item.name}</option>
              ))}
          </select>
        </div>

        <div className="flex flex-col justify-start items-start mb-3">
          <label className="font-semibold">Address</label>
          <small>The specific address</small>
          <input
            type="text"
            {...register("address", { required: true })}
            className={`border border-solid   p-2 ${
              errors.address
                ? "border-red-400"
                : "border-warmGray-200 focus:ring-1"
            } focus:outline-none`}
          />
          {errors.address && (
            <small className="text-red-500 text-sm">Invalid address</small>
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

export default AddAddress;
