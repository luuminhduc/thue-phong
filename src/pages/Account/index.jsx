import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AccountSideBar from "../../components/AccountSideBar";
import EditProfile from "../../components/EditProfile";

const Account = () => {
  const params = useParams();

  const { currentUser } = useSelector((state) => state.loginReducer);

  const renderBlock = () => {
    const { accountPath } = params;
    switch (accountPath) {
      default:
        return <EditProfile></EditProfile>;
    }
  };

  return currentUser ? (
    <div className="grid md:grid-cols-4 gap-16 md:max-w-6xl mx-auto">
      <div className="md:col-span-1">
        <AccountSideBar />
      </div>
      <div className="md:col-span-3">{renderBlock()}</div>
    </div>
  ) : (
    ""
  );
};

export default Account;
