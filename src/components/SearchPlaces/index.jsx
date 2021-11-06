import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const SearchPlaces = () => {
  const { vietNamInfo } = useSelector((state) => state.placeReducer);

  const history = useHistory();

  const priceList = [
    { giaTu: "", giaDen: 20 },
    { giaTu: 20, giaDen: 50 },
    { giaTu: 50, giaDen: 100 },
    { giaTu: 100, giaDen: 200 },
    { giaTu: 200, giaDen: 400 },
    { giaTu: 400, giaDen: 800 },
    { giaTu: 800, giaDen: "" },
  ];

  const sizeList = [
    { dienTichTu: "", dienTichDen: 20 },
    { dienTichTu: 20, dienTichDen: 30 },
    { dienTichTu: 30, dienTichDen: 50 },
    { dienTichTu: 50, dienTichDen: 70 },
    { dienTichTu: 70, dienTichDen: 90 },
    { dienTichTu: 90, dienTichDen: "" },
  ];

  const [data, setData] = useState({
    propertyType: "",
    city: "Thành phố Hà Nội",
    priceIndex: "",
    duration: "",
    size: "",
  });

  const handleChange = (name, value) => {
    const newData = { ...data };
    newData[name] = value;
    setData(newData);
  };

  const handleBtn = () => {
    const { city, propertyType, priceIndex, duration, size } = data;
    let giaTu;
    let giaDen;
    let dienTichTu;
    let dienTichDen;
    if (priceIndex) {
      giaTu = priceList[priceIndex]["giaTu"];
      giaDen = priceList[priceIndex]["giaDen"];
    } else {
      giaTu = "";
      giaDen = "";
    }

    if (size) {
      dienTichTu = sizeList[size]["dienTichTu"];
      dienTichDen = sizeList[size]["dienTichDen"];
    } else {
      dienTichTu = "";
      dienTichDen = "";
    }

    history.push({
      pathname: "/search",
      search: `?c=${city}&&d=${duration}&&propertyType=${propertyType}&&giaTu=${giaTu}&&giaDen=${giaDen}&&dienTichTu=${dienTichTu}&&dienTichDen=${dienTichDen}`,
    });
  };

  return (
    <div className="bg-warmGray-100 p-8 rounded-md">
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
        <select
          name="propertyType"
          value={data["propertyType"]}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          className="border border-solid border-warmGray-200 p-3 rounded-md focus:outline-none focus:border-blue-400"
        >
          <option>Room</option>
          <option>House</option>
        </select>
        {vietNamInfo?.length > 0 && (
          <select
            name="city"
            value={data["city"]}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className="border border-solid border-warmGray-200 p-3 rounded-md focus:outline-none focus:border-blue-400"
          >
            {vietNamInfo.map((item, idx) => (
              <option key={idx}>{item.name}</option>
            ))}
          </select>
        )}
        <select
          name="priceIndex"
          value={data["priceIndex"]}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          className="border border-solid border-warmGray-200 p-3 rounded-md focus:outline-none focus:border-blue-400"
        >
          <option value={0}>Duoi 20$</option>
          <option value={1}>Tu 20-50$</option>
          <option value={2}>Tu 50-100$</option>
          <option value={3}>Tu 100-200$</option>
          <option value={4}>Tu 200-400$</option>
          <option value={5}>Tu 400-800$</option>
          <option value={6}>Tren 800$</option>
        </select>
        <select
          name="duration"
          value={data["duration"]}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          className="border border-solid border-warmGray-200 p-3 rounded-md focus:outline-none focus:border-blue-400"
        >
          <option value="monthly">Theo thang</option>
          <option value="daily">Theo Ngay</option>
        </select>
        <select
          name="size"
          value={data["size"]}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          className="border border-solid border-warmGray-200 p-3 rounded-md focus:outline-none focus:border-blue-400"
        >
          <option value={0}>Duoi 20m</option>
          <option value={1}>Tu 20-30m</option>
          <option value={2}>Tu 30-50m</option>
          <option value={3}>Tu 50-70m</option>
          <option value={4}>Tu 70-90m</option>
          <option value={5}>Tren 90m</option>
        </select>
      </div>
      <div className="text-center mt-5">
        <button
          onClick={handleBtn}
          type="button"
          className="bg-blue-400 hover:bg-blue-300 focus:outline-none text-white w-full lg:w-1/3 p-3 rounded-md md:w-1/2"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchPlaces;
