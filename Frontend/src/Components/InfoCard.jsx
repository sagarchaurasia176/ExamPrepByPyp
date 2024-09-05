import React from "react";

import pdf from "../img/pdf.png";
import reading from "../img/reading.png";
import file from '../img/file.png'
function InfoCard() {
  return (
    <div>
      <div className=" w-full  flex flex-row-3 justify-center gap-3">
        {/* one div */}
    
        <div className=" bg-green-200 w-[278px] rounded-md items-center flex cursor-pointer ">
          <img className= " max-w-md w-16  right-2" src={pdf} alt="" />
          <span className=" text-center  font-semibold text-black">
                400 ➕ Paper
          </span>
        </div>

        <div className=" bg-green-200 w-[278px] rounded-md items-center flex cursor-pointer ">
          <img className= " max-w-md w-16  right-2" src={reading} alt="" />
          <span className=" text-center  font-semibold text-black">
                600 ➕ student Happy
          </span>
        </div>
        <div className=" bg-green-200 w-[278px] rounded-md items-center flex cursor-pointer ">
          <img className= " max-w-md w-16  right-2" src={file} alt="" />
          <span className=" text-center  font-semibold text-black">
                100 ➕ Contribution
          </span>
        </div>
      

      </div>
    </div>
  );
}

export default InfoCard;
