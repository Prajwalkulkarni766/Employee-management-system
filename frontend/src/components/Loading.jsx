import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useSelector } from "react-redux";

const Loading = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  return (
    isLoading && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust opacity as needed
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScaleLoader color="rgb(25, 118, 210)" size={900} />
      </div>
    )
  );
};

export default Loading;
