import React from "react";
import SearchFilter from "./button/SearchFilter";
import Branch from "./button/Branch";
import Stream from "./button/Stream";

const FilerationsPage = () => {
  return (
    <div className="bg-slate-950   mt-[6vw]">
      {/* three options   */}
      <div className="border-box flex flex-1  flex-wrap z-0 justify-center flex-row  bg-slate-900 p-4 gap-12 ">
        <Branch />
        <Stream/>
        <SearchFilter />
      </div>
      {/* filteration btn  */}
      {/* select couse */}
      {/* select sem */}
    </div>
  );
};

export default FilerationsPage;
