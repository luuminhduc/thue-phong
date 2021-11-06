import React from "react";
import ReviewItem from "../ReviewItem";

const ReviewList = ({ list }) => {
  return (
    list.length > 0 && (
      <div className="my-5">
        {list?.map((item, idx) => (
          <ReviewItem key={idx} item={item} />
        ))}
      </div>
    )
  );
};

export default ReviewList;
