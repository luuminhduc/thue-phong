import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddReview from "../../components/AddReview";
import PhotoModal from "../../components/PhotoModal";
import ReviewList from "../../components/ReviewList";
import { firestore } from "../../firebase/config";
import { showModal } from "../../redux/action/modalAction/actions";

const SinglePlace = () => {
  const params = useParams();
  const { placeId } = params;
  const { listOfPlaces } = useSelector((state) => state.placeReducer);

  const [place, setPlace] = useState(null);

  const [landLord, setLanLord] = useState(null);

  const [photoModal, setPhotoModal] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [reviewModal, setReviewModal] = useState(false);

  const [reviewList, setReviewList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (place) {
      fetchReviewList();
    }
    // eslint-disable-next-line
  }, [place]);

  const fetchReviewList = () => {
    firestore
      .collection("reviews")
      .where("placeId", "==", place.id)
      .get()
      .then((snap) => {
        const docs = [];
        snap.forEach((el) => docs.push({ ...el.data(), id: el.id }));
        setReviewList(docs);
      })
      .catch((err) => {
        dispatch(showModal({ title: "Error", content: err.message }));
      });
  };
  useEffect(() => {
    if (place) {
      firestore
        .collection("users")
        .doc(place.uid)
        .get()
        .then((res) => {
          setLanLord(res.data());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [place]);

  useEffect(() => {
    setPlace(listOfPlaces.find((el) => el.id === placeId));
  }, [listOfPlaces, placeId]);

  const renderLandlordInfo = () => {
    const { phoneNumber, userName, email } = landLord;
    return (
      <div className="p-3 border rounded-md border-warmGray-200 border-solid">
        <p className="font-semibold mb-3">
          Ten chu nha: <span className="font-normal">{userName}</span>
        </p>
        <p className="font-semibold mb-3">
          So dien thoai: <span className="font-normal">{phoneNumber}</span>
        </p>
        <p className="font-semibold mb-3">
          Email: <span className="font-normal">{email}</span>
        </p>
        <button className="bg-blue-400 text-white rounded-md p-3 cursor-pointer w-full hover:bg-blue-300">
          Lien he ngay
        </button>
      </div>
    );
  };

  const renderImgBlock = () => {
    const { photos } = place;

    const onShowModal = () => {
      setPhotoModal(true);
    };

    return (
      <div className="grid gap-3 grid-cols-5 grid-rows-3 ">
        <div
          onClick={() => onShowModal()}
          className="col-start-1 col-end-4 row-span-3"
        >
          <img
            alt="1"
            src={photos[1]}
            className="w-full cursor-pointer h-auto"
          />
        </div>
        <div
          onClick={() => onShowModal()}
          className="col-start-4 col-end-6 row-span-2"
        >
          <img
            alt="2"
            src={photos[2]}
            className="w-full cursor-pointer h-auto"
          />
        </div>
        <div
          onClick={() => onShowModal()}
          className="col-start-4 col-end-5 row-span-1"
        >
          <img
            alt="3"
            src={photos[3]}
            className="w-full cursor-pointer h-auto"
          />
        </div>
        <div className="col-start-5 col-end-6 row-span-1">
          {photos[4] && (
            <div
              onClick={() => onShowModal()}
              className="w-full h-full relative"
            >
              <div className="absolute w-full h-full bg-black bg-opacity-40 text-white flex text-center justify-center items-center cursor-pointer top-0 left-0">
                <p className="font-semibold">Xem tat ca hinh anh</p>
              </div>
              <img alt="4" src={photos[4]} className="w-full h-auto" />
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTitle = () => {
    const { title, propertyType, district, city } = place;
    return (
      <div className="border my-5 border-solid border-warmGray-200 p-5 rounded-sm">
        <p className="mb-3 border border-solid border-green-700 px-3 py-1 text-sm rounded-md text-green-700 inline-block">
          {propertyType}
        </p>
        <h1 className="font-bold text-warmGray-700 text-2xl mb-3">{title}</h1>
        <p>
          Quan {district} {city} Viet Nam
        </p>
      </div>
    );
  };

  const displayStar = () => {
    const arr = [
      "Toi te",
      "Duoi trung binh",
      "Binh thuong",
      "Tot",
      "Cuc hai long",
    ];
    let averageRate;
    if (reviewList.length > 0) {
      const totalRate = reviewList
        .map((el) => el.rating)
        .reduce((a, b) => (a += b));
      averageRate = Math.round(totalRate / reviewList.length);
    } else {
      averageRate = 0;
    }
    return (
      <div className="p-3 border rounded-md border-warmGray-200 border-solid mt-5">
        <div className="flex flex-row justify-start items-center">
          <p className="rounded-full  w-14 h-14 flex justify-center text-xl font-semibold items-center bg-rose-400 text-white">
            {averageRate} / <span className="text-xs">5</span>
          </p>
          <div className="flex ml-3 flex-col  justify-start items-start">
            <p className="text-warmGray-700 font-semibold text-xl">
              {arr[averageRate - 1]}
            </p>
            <p className="text-xs">{reviewList.length} bai danh gia</p>
          </div>
        </div>

        <div>
          {[5, 4, 3, 2, 1].map((el) => (
            <div
              className="flex w-full flex-row justify-between items-center my-2 text-sm"
              key={el}
            >
              <div className="flex flex-row justify-start items-center">
                <span>{el}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="flex-grow mx-1 relative bg-warmGray-100 h-2 rounded-md">
                <div
                  style={{ width: `${calculatePercent(el)}%` }}
                  className="absolute top-0 left-0 h-full  bg-rose-400 rounded-md"
                ></div>
              </div>
              <p style={{ minWidth: "30px" }} className="">
                {calculatePercent(el)} %
              </p>
            </div>
          ))}
        </div>
        <div className="mt-5 text-center">
          <a className="text-sm cursor-pointer text-blue-400" href="#reviews">
            See reviews
          </a>
        </div>
      </div>
    );
  };

  const calculatePercent = (num) => {
    if (reviewList.length > 0) {
      const count = reviewList
        .map((el) => el.rating)
        .filter((el) => el === num).length;
      const percent = (count / reviewList.length) * 100;
      return Math.floor(percent);
    } else {
      return 0;
    }
  };

  const renderSize = () => {
    const { size } = place;
    return (
      <div className="border my-5 border-solid border-warmGray-200 p-5 rounded-sm">
        <h3 className="font-bold text-warmGray-700 border-b border-solid border-warmGray-200 pb-3 mb-3">
          Khong gian phong
        </h3>
        <p className="mb-3">Dien tich: {size}m</p>
        <div className="w-full grid grid-cols-3 gap-5">
          <div className="border-solid border border-warmGray-200 p-3 rounded-md">
            <h6 className="font-semibold">Khong gian chung</h6>
            <p className="text-sm mt-3">Sieu lon</p>
          </div>
          <div className="border-solid border border-warmGray-200 p-3 rounded-md">
            <h6 className="font-semibold">Phòng tắm và vật dụng phòng tắm</h6>
            <p className="text-sm mt-3">
              Các loại khăn, Máy sấy tóc, Vật dụng tắm rửa, Vòi sen
            </p>
          </div>
          <div className="border-solid border border-warmGray-200 p-3 rounded-md">
            <h6 className="font-semibold">Bếp</h6>
            <p className="text-sm mt-3">
              Bếp đầy đủ, Cà phê hòa tan miễn phí, Trà miễn phí
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderDescription = () => {
    const { description } = place;
    return (
      <div className="border my-5 border-solid border-warmGray-200 p-5 rounded-sm">
        <h3 className="font-bold text-warmGray-700 border-b border-solid border-warmGray-200 pb-3 mb-3">
          Mo ta
        </h3>
        <p>{description}</p>
      </div>
    );
  };

  return place ? (
    <div className="mx-auto w-full md:max-w-4xl lg:max-w-6xl sm:max-w-3xl">
      {photoModal && (
        <PhotoModal
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          photos={place.photos}
          setPhotoModal={setPhotoModal}
        />
      )}
      <div className="grid md:grid-cols-7 gap-10">
        <div className="w-full md:col-span-5">
          {renderImgBlock()}
          {renderTitle()}
          {renderSize()}
          {renderDescription()}
        </div>
        <div className="md:col-span-2 w-full">
          {landLord && renderLandlordInfo()}
          {displayStar()}
        </div>
      </div>

      {reviewModal && (
        <AddReview
          setReviewModal={setReviewModal}
          placeId={place.id}
          reviewList={reviewList}
          fetchReviewList={fetchReviewList}
        />
      )}

      <div id="reviews" className="mt-10">
        <h1 className="font-bold text-xl text-warmGray-700">Review</h1>
        <ReviewList list={reviewList} />
        <button
          onClick={() => setReviewModal(true)}
          className="px-8 py-4 border border-solid border-rose-400 rounded-md text-rose-400 mt-5 hover:bg-rose-400 hover:text-white"
        >
          Add review
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default SinglePlace;
