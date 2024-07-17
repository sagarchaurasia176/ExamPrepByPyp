import React from "react";
import pdf from '../img/pdf.png';
import { apiData } from "../lib/CourseApi";
const PaperRoute = () => {
  return (
    <div>
      <div className="">
        <ul className=" w-[500px]  text-sm font-medium ">
          {apiData.map((data) => {
            return (
              <>
                <div className=" flex justify-center">
                <li class="w-full cursor-pointer px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <img src={pdf} alt="" className=" w-9 animate-pulse" />
                  <span className=" flex  justify-end">
                  {data.name}

                  </span>
                </li>
                
                </div>
               
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PaperRoute;
