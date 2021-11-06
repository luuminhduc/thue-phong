import React from "react";
import "./index.css";

const PhotoModal = ({
  photos,
  currentIndex,
  setPhotoModal,
  setCurrentIndex,
}) => {
  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(photos.length - 1);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center  bg-black bg-opacity-60 z-40">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 absolute top-8 right-16 text-white cursor-pointer"
        onClick={() => setPhotoModal(false)}
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
      <div className="max-w-6xl w-full rounded-md mx-auto bg-black p-5">
        <div className="flex flex-row justify-center items-center">
          <svg
            onClick={handlePrev}
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <img className="h-96 mx-5" src={photos[currentIndex]} alt="" />
          <svg
            onClick={handleNext}
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <div className="mt-5 border-t border-solid border-warmGray-700 pt-5 flex flex-wrap">
          {photos.map((item, idx) => (
            <img
              alt={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-24 mr-3  cursor-pointer ${
                currentIndex === idx && "border-2 border-solid border-blue-400"
              }`}
              src={item}
              key={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
