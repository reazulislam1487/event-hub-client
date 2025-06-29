
const AnimatedLoader = () => {
  return (
    <div className="relative w-16 h-16">
      {/* Outer spinner ring */}
      <div className="w-full h-full border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>

      {/* Center dot (optional) */}
      <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gray-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};

export default AnimatedLoader;
