import React from "react";
import AnimatedLoader from "./AnimatedLoader";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <AnimatedLoader />
      </div>
    </div>
  );
};

export default Loading;
