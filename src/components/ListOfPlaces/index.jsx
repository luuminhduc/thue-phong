import React from "react";
import PlaceItem from "../PlaceItem";

const ListOfPlaces = ({ list, cols }) => {
  return (
    <div>
      <div
        className={`grid lg:grid-cols-${cols} md:grid-cols-${
          cols - 1
        } sm:grid-cols-2 grid-cols-1 gap-10`}
      >
        {list?.length > 0 &&
          list.map((item, idx) => <PlaceItem key={idx} item={item} />)}
      </div>
    </div>
  );
};

export default ListOfPlaces;
