import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../redux/action/modalAction/actions";
import { firestore, timeStamp } from "../../firebase/config";
const AddReview = ({
  setReviewModal,
  placeId,
  reviewList,
  fetchReviewList,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(3);

  const { auth } = useSelector((state) => state.firebaseReducer);
  const { uid } = auth;

  const dispatch = useDispatch();

  const addReview = () => {
    const review = { title, content, rating, uid, placeId, time: timeStamp() };
    firestore
      .collection("reviews")
      .add(review)
      .then(() => {
        fetchReviewList();
        setReviewModal(false);
      })
      .catch((err) => {
        dispatch(showModal({ title: "Error", content: err.message }));
      });
  };
  const onAddReview = () => {
    if (title && content && rating) {
      if (uid) {
        if (reviewList.map((el) => el.uid).includes(uid)) {
          dispatch(
            showModal({
              title: "Error",
              content: "You can only have one review on each property",
            })
          );
        } else {
          addReview();
        }
      } else {
        dispatch(
          showModal({
            title: "Error",
            content: "You have to log in to have a review",
          })
        );
      }
    } else {
      dispatch(
        showModal({
          title: "Error",
          content: "Xin hay dien vao tat ca cac cho trong",
        })
      );
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-30 bg-black bg-opacity-60">
      <div className="w-full md:max-w-4xl bg-white rounded-md shadow-md">
        <div className="flex px-5 py-3 flex-row justify-between border-b border-solid border-warmGray-200 items-center">
          <h3 className="text-warmGray-700 font-semibold text-xl">
            Add review
          </h3>
        </div>
        <div className="px-5 py-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="w-full mb-5 p-3 rounded-md border border-solid focus:outline-none border-warmGray-200 focus:border-blue-400"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            type="text"
            placeholder="Content"
            className="w-full mb-5 p-3 rounded-md border border-solid focus:outline-none border-warmGray-200 focus:border-blue-400"
          />
          <div>
            <h4>Rating ({rating})</h4>
            <div className="flex flex-row justify-start items-center">
              {[1, 2, 3, 4, 5].map((el) => (
                <svg
                  onClick={() => setRating(el)}
                  key={el}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-7 ${
                    el <= rating ? "text-blue-400" : "text-warmGray-400"
                  } mr-1 w-7 cursor-pointer`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end items-center px-5 py-3 border-t border-solid border-warmGray-200">
          <button
            onClick={() => setReviewModal(false)}
            className="bg-warmGray-200 px-4 py-2 rounded-md cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onAddReview}
            className="px-4 py-2 bg-blue-400 ml-3 text-white hover:bg-blue-300 focus:outline-none rounded-md cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
