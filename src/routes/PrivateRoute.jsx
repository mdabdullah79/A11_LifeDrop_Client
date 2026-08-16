import React from "react";
import useAuth from "../hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { Navigate } from "react-router";
import { ColorRing } from "react-loader-spinner";
import Loading from "../Components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
        <Loading></Loading>
    );
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
