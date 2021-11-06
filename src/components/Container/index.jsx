import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/action/loginAction/actions";
import {
  fetchPlaces,
  fetchVietNamInfo,
} from "../../redux/action/placeAction/actions";
import Footer from "../Footer";
import Header from "../Header";
import Modal from "../Modal";

const Container = ({ children }) => {
  const { auth } = useSelector((state) => state.firebaseReducer);
  const { uid } = auth;

  const dispatch = useDispatch();

  useEffect(() => {
    if (uid) dispatch(getCurrentUser(uid));
  }, [uid, dispatch]);

  useEffect(() => {
    dispatch(fetchPlaces());
    dispatch(fetchVietNamInfo());
  }, [dispatch]);

  return (
    <div className="min-h-screen w-full bg-white text-warmGray-500">
      <Header />
      <Modal />
      <div className="bg-warmGray-100 flex justify-center font-semibold tracking-wider items-center p-4">
        We are commited to give our customers the best price!
      </div>
      <div className="mt-10 px-3">{children}</div>
      <Footer />
    </div>
  );
};

export default Container;
