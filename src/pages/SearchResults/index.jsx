import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ListOfPlaces from "../../components/ListOfPlaces";

const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search);

  const cityName = query.get("c");
  const districtName = query.get("d");
  const currentPropertyType = query.get("propertyType");
  const currentDuration = query.get("duration");
  const giaTu = query.get("giaTu") ? query.get("giaTu") : "all";
  const giaDen = query.get("giaDen") ? query.get("giaDen") : "all";
  const dienTichTu = query.get("dienTichTu") ? query.get("dienTichTu") : "all";
  const dienTichDen = query.get("dienTichDen")
    ? query.get("dienTichDen")
    : "all";

  const { listOfPlaces } = useSelector((state) => state.placeReducer);

  const [list, setList] = useState([]);

  const { vietNamInfo } = useSelector((state) => state.placeReducer);

  useEffect(() => {
    let arr = listOfPlaces.filter((el) => el.city === cityName);
    if (districtName && districtName !== "null") {
      arr = arr.filter((el) => el.district === districtName);
    }
    if (currentPropertyType && currentPropertyType !== "null") {
      arr = arr.filter((el) => el.propertyType === currentPropertyType);
    }
    if (currentDuration && currentDuration !== "null") {
      arr = arr.filter((el) => el.duration === currentDuration);
    }
    if (giaTu !== "all" || giaDen !== "all") {
      if (giaDen === "all") {
        arr = arr.filter((el) => +el.price >= +giaTu);
      } else if (giaTu === "all") {
        arr = arr.filter((el) => +el.price < +giaDen);
      } else {
        arr = arr.filter((el) => +el.price >= +giaTu && +el.price < +giaDen);
      }
    }

    if (dienTichTu !== "all" || dienTichDen !== "all") {
      if (dienTichDen === "all") {
        arr = arr.filter((el) => +el.size >= +dienTichTu);
      } else if (dienTichTu === "all") {
        arr = arr.filter((el) => +el.size < +dienTichDen);
      } else {
        arr = arr.filter(
          (el) => +el.size >= +dienTichTu && +el.size < +dienTichDen
        );
      }
    }

    setList(arr);
  }, [
    listOfPlaces,
    cityName,
    districtName,
    currentPropertyType,
    currentDuration,
    giaTu,
    giaDen,
    dienTichTu,
    dienTichDen,
  ]);

  const history = useHistory();

  const filterByDistrict = () => {
    let districtList = vietNamInfo?.find(
      (el) => el.name === cityName
    )?.districts;

    districtList = districtList?.map((el) => ({ district: el.name, count: 0 }));

    const placesOfCity = listOfPlaces
      ?.filter((el) => el.city === cityName)
      ?.map((el) => el.district);

    districtList?.forEach((item) => {
      if (placesOfCity.includes(item.district)) {
        item.count = placesOfCity?.filter((el) => el === item.district)?.length;
      }
    });

    districtList = districtList?.filter((el) => el.count > 0);

    const handleDistrictChange = (para) => {
      history.push({
        pathname: "/search",
        search: `?c=${cityName}&&d=${
          para ? para : ""
        }&&propertyType=${currentPropertyType}&&duration=${currentDuration}&&giaDen=${giaDen}&&giaTu=${giaTu}&&dienTichTu=${dienTichTu}&&dienTichDen=${dienTichDen}`,
      });
    };

    return (
      <div className="mb-5 border border-solid border-warmGray-200 rounded-md p-3">
        <h4 className="font-semibold mb-3">Khu vuc</h4>
        <div className="grid md:grid-cols-2 grid-cols-3 gap-5 mt-3">
          {districtList?.map((el, i) => (
            <div className="flex flex-row justify-start items-center" key={i}>
              <input
                onChange={() => handleDistrictChange(el.district)}
                checked={districtName === el.district ? true : false}
                name="district"
                className="mr-1"
                type="radio"
              />
              <small className="tracking-wider">
                {el.district} ({el.count})
              </small>
            </div>
          ))}
          <div className="flex flex-row justify-start items-center">
            <input
              onChange={() => handleDistrictChange()}
              checked={districtName === "null" || !districtName ? true : false}
              name="district"
              className="mr-1"
              type="radio"
            />
            <small>All</small>
          </div>
        </div>
      </div>
    );
  };

  const filterByPropertyType = () => {
    const propertyList = ["Room", "House"];
    const handlePropertyType = (para) => {
      history.push({
        pathname: "/search",
        search: `?c=${cityName}&&d=${districtName}&&propertyType=${
          para ? para : ""
        }&&duration=${currentDuration}&&giaDen=${giaDen}&&giaTu=${giaTu}&&dienTichTu=${dienTichTu}&&dienTichDen=${dienTichDen}`,
      });
    };
    return (
      <div className="mb-5 border border-solid border-warmGray-200 rounded-md p-3">
        <h4 className="font-semibold mb-3">Loai bat dong san</h4>
        <div className="grid md:grid-cols-2 grid-cols-3 gap-5 mt-3">
          {propertyList?.map((el, i) => (
            <div className="flex flex-row justify-start items-center" key={i}>
              <input
                onChange={() => handlePropertyType(el)}
                checked={currentPropertyType === el ? true : false}
                name="propertyType"
                className="mr-1"
                type="radio"
              />
              <small className="tracking-wider">{el}</small>
            </div>
          ))}
          <div className="flex flex-row justify-start items-center">
            <input
              onChange={() => handlePropertyType("")}
              checked={
                currentPropertyType === "null" || !currentPropertyType
                  ? true
                  : false
              }
              name="propertyType"
              className="mr-1"
              type="radio"
            />
            <small>All</small>
          </div>
        </div>
      </div>
    );
  };

  const filterByDuration = () => {
    const handleDuration = (para) => {
      history.push({
        pathname: "/search",
        search: `?c=${cityName}&&d=${districtName}&&propertyType=${currentPropertyType}&&duration=${para}&&giaDen=${giaDen}&&giaTu=${giaTu}&&dienTichTu=${dienTichTu}&&dienTichDen=${dienTichDen}`,
      });
    };
    return (
      <div className="border border-solid border-warmGray-200 rounded-md p-3 mb-5">
        <h4 className="font-semibold mb-3">Loai cho thue</h4>
        <div className="grid md:grid-cols-2 grid-cols-3 gap-5 mt-3">
          <div className="flex flex-row  justify-start items-center">
            <input
              name="duration"
              checked={currentDuration === "monthly" ? true : false}
              onChange={() => handleDuration("monthly")}
              className="mr-1"
              type="radio"
            />
            <small className="tracking-wider">Theo thang</small>
          </div>
          <div className="flex flex-row justify-start items-center">
            <input
              name="duration"
              checked={currentDuration === "daily" ? true : false}
              onChange={() => handleDuration("daily")}
              className="mr-1"
              type="radio"
            />
            <small className="tracking-wider">Theo ngay</small>
          </div>
          <div className="flex  flex-row justify-start items-center">
            <input
              name="duration"
              checked={
                currentDuration === "null" || !currentDuration ? true : false
              }
              onChange={() => handleDuration("")}
              className="mr-1"
              type="radio"
            />
            <small className="tracking-wider">All</small>
          </div>
        </div>
      </div>
    );
  };

  const filterByPrice = () => {
    const handlePrice = (para1, para2) => {
      history.push({
        pathname: "/search",
        search: `?c=${cityName}&&d=${districtName}&&propertyType=${currentPropertyType}&&duration=${currentDuration}&&giaTu=${para1}&&giaDen=${
          para2 ? para2 : ""
        }&&dienTichTu=${dienTichTu}&&dienTichDen=${dienTichDen}`,
      });
    };
    return (
      <div className="border border-solid border-warmGray-200 rounded-md p-3 mb-5">
        <h4 className="font-semibold">Gia</h4>
        <div className="grid md:grid-cols-2 grid-cols-3 gap-5 mt-3">
          <div className="flex flex-row justify-start items-center">
            <input
              name="price"
              checked={+giaDen === 20 ? true : false}
              className="mr-1"
              type="radio"
              onChange={() => handlePrice("", 20)}
            />
            <small className="tracking-wider">Duoi 20$</small>
          </div>
          <div className="flex flex-row  justify-start items-center">
            <input
              name="price"
              checked={+giaTu === 20 && +giaDen === 50 ? true : false}
              className="mr-1"
              type="radio"
              onChange={() => handlePrice(20, 50)}
            />
            <small className="tracking-wider">Tu 20-50$</small>
          </div>
          <div className="flex flex-row  justify-start items-center">
            <input
              name="price"
              checked={+giaTu === 50 && +giaDen === 100 ? true : false}
              className="mr-1"
              type="radio"
              onChange={() => handlePrice(50, 100)}
            />
            <small className="tracking-wider">Tu 50$-100$</small>
          </div>
          <div className="flex flex-row  justify-start items-center">
            <input
              name="price"
              checked={+giaTu === 100 && +giaDen === 200 ? true : false}
              className="mr-1"
              type="radio"
              onChange={() => handlePrice(100, 200)}
            />
            <small className="tracking-wider">Tu 100$-200$</small>
          </div>
          <div className="flex flex-row  justify-start items-center">
            <input
              name="price"
              checked={+giaTu === 200 && +giaDen === 400 ? true : false}
              className="mr-1"
              type="radio"
              onChange={() => handlePrice(200, 400)}
            />
            <small className="tracking-wider">Tu 200$-400$</small>
          </div>
          <div className="flex flex-row  justify-start items-center">
            <input
              name="price"
              checked={+giaTu === 400 && +giaDen === 800 ? true : false}
              className="mr-1"
              type="radio"
              onChange={() => handlePrice(400, 800)}
            />
            <small className="tracking-wider">Tu 400$-800$</small>
          </div>
          <div className="flex flex-row  justify-start items-center">
            <input
              name="price"
              checked={+giaTu === 800 ? true : false}
              className="mr-1"
              type="radio"
              onChange={() => handlePrice(800)}
            />
            <small className="tracking-wider">Tren 800$</small>
          </div>
          <div className="flex flex-row  justify-start items-center">
            <input
              name="price"
              checked={giaTu === "all" && giaDen === "all" ? true : false}
              className="mr-1"
              type="radio"
              onChange={() => handlePrice("all")}
            />
            <small className="tracking-wider">All</small>
          </div>
        </div>
      </div>
    );
  };

  const filterBySize = () => {
    const handleSize = (para1, para2) => {
      history.push({
        pathname: "/search",
        search: `?c=${cityName}&&d=${districtName}&&propertyType=${currentPropertyType}&&duration=${currentDuration}&&giaTu=${giaTu}&&giaDen=${giaDen}&&dienTichTu=${para1}&&dienTichDen=${
          para2 ? para2 : ""
        }`,
      });
    };
    return (
      <div className="border border-solid border-warmGray-200 rounded-md p-3 mb-5">
        <h4 className="font-semibold">Dien tich</h4>
        <div className="grid md:grid-cols-2 grid-cols-3 gap-5 mt-3">
          <div className="flex flex-row justify-start items-center">
            <input
              name="size"
              checked={+dienTichDen === 20 ? true : false}
              className="mr-1"
              type="radio"
              onChange={() => handleSize("", 20)}
            />
            <small className="tracking-wider">Duoi 20m</small>
          </div>
          <div className="flex flex-row  justify-start items-center">
            <input
              name="size"
              checked={+dienTichTu === 20 && +dienTichDen === 30 ? true : false}
              className="mr-1"
              type="radio"
              onChange={() => handleSize(20, 30)}
            />
            <small className="tracking-wider">Tu 20-30m</small>
          </div>
          <div className="flex flex-row  justify-start items-center">
            <input
              name="size"
              checked={+dienTichTu === 30 && +dienTichDen === 50 ? true : false}
              className="mr-1"
              type="radio"
              onChange={() => handleSize(30, 50)}
            />
            <small className="tracking-wider">Tu 30-50m</small>
          </div>
          <div className="flex flex-row  justify-start items-center">
            <input
              name="size"
              checked={+dienTichTu === 50 && +dienTichDen === 70 ? true : false}
              className="mr-1"
              type="radio"
              onChange={() => handleSize(50, 70)}
            />
            <small className="tracking-wider">Tu 50-70m</small>
          </div>
          <div className="flex flex-row  justify-start items-center">
            <input
              name="size"
              checked={+dienTichTu === 70 && +dienTichDen === 90 ? true : false}
              className="mr-1"
              type="radio"
              onChange={() => handleSize(70, 90)}
            />
            <small className="tracking-wider">Tu 70-90m</small>
          </div>
          <div className="flex flex-row  justify-start items-center">
            <input
              name="size"
              checked={+dienTichTu === 90 ? true : false}
              className="mr-1"
              type="radio"
              onChange={() => handleSize(90)}
            />
            <small className="tracking-wider">Tren 90m</small>
          </div>
          <div className="flex flex-row  justify-start items-center">
            <input
              name="size"
              checked={
                dienTichTu === "all" && dienTichDen === "all" ? true : false
              }
              className="mr-1"
              type="radio"
              onChange={() => handleSize("all")}
            />
            <small className="tracking-wider">All</small>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full lg:max-w-7xl md:max-w-6xl mx-auto">
      <div className="grid md:grid-cols-7 gap-10 ">
        <div className="md:col-span-2">
          {vietNamInfo && filterByDistrict()}
          {filterByPropertyType()}
          {filterByDuration()}
          {filterByPrice()}
          {filterBySize()}
        </div>
        <div className="md:col-span-5">
          <div className="w-full mb-10 p-4 rounded-md text-red-400 bg-red-50">
            <h6>
              Nhanh lên! 59% chỗ nghỉ trên trang của chúng tôi đã kín phòng!
            </h6>
          </div>

          <ListOfPlaces cols={3} list={list} />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
