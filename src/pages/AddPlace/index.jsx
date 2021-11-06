import React from "react";
import { useState } from "react";
import AddAddress from "../../components/AddPlaceComponents/AddAddress";
import AddBasicInfo from "../../components/AddPlaceComponents/AddBasicInfo";
import AddDescription from "../../components/AddPlaceComponents/AddDescription";
import AddPhotos from "../../components/AddPlaceComponents/AddPhotos";
import AddPrice from "../../components/AddPlaceComponents/AddPrice";
import ConfirmPlace from "../../components/AddPlaceComponents/ConfirmPlace";

const AddPlace = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "Basic info",
    "Addess",
    "Description",
    "Price",
    "Photos",
    "Confirm",
  ];

  const [newPlaceInfo, setNewPlaceInfo] = useState({
    propertyType: "",
    size: "",
    target: "All",
    city: "",
    district: "",
    ward: "",
    address: "",
    title: "",
    description: "",
    price: "",
    duration: "monthly",
    deposit: "",
    photos: [],
  });

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 2:
        return (
          <AddAddress
            newPlaceInfo={newPlaceInfo}
            setNewPlaceInfo={setNewPlaceInfo}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        );
      case 3:
        return (
          <AddDescription
            newPlaceInfo={newPlaceInfo}
            setNewPlaceInfo={setNewPlaceInfo}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        );
      case 4:
        return (
          <AddPrice
            newPlaceInfo={newPlaceInfo}
            setNewPlaceInfo={setNewPlaceInfo}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        );
      case 5:
        return (
          <AddPhotos
            newPlaceInfo={newPlaceInfo}
            setNewPlaceInfo={setNewPlaceInfo}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        );
      case 6:
        return (
          <ConfirmPlace
            newPlaceInfo={newPlaceInfo}
            setNewPlaceInfo={setNewPlaceInfo}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        );
      default:
        return (
          <AddBasicInfo
            newPlaceInfo={newPlaceInfo}
            setNewPlaceInfo={setNewPlaceInfo}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        );
    }
  };

  const renderStepProgress = () => {
    return (
      <div
        style={{ height: "450px" }}
        className="bg-white w-full col-span-1 rounded border relative border-solid border-warmGray-200 p-3 flex flex-col justify-between items-start"
      >
        {steps.map((item, idx) => (
          <div
            className="mb-5 flex flex-row justify-start items-center"
            key={item}
          >
            <div
              className={`mr-5 text-xs h-5 w-5 rounded-full flex justify-center items-center ${`${
                idx + 1 <= currentStep
                  ? "bg-cyan-700 text-white"
                  : "bg-warmGray-100"
              }`}`}
            >
              {idx + 1}
            </div>
            <p
              className={`${
                idx + 1 <= currentStep && "text-cyan-700 font-bold"
              }`}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full lg:max-w-6xl grid mx-auto grid-cols-1 md:grid-cols-4 gap-10">
      {renderStepProgress()}
      <div className="bg-white p-5 rounded border border-solid border-warmGray-200 col-span-3">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default AddPlace;
