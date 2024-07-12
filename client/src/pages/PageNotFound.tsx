const PageNotFound = () => {
  return (
    <div className="flex flex-col gap-2 justify-center h-[630px] items-center">
      <span className="text-7xl text-gray-700 font-bold ">404</span>  
      <span className="text-xl font-semibold">Not Found</span>
      <span>The resource requested could not be found on this server!</span>
    </div>
  );
};

export default PageNotFound;
