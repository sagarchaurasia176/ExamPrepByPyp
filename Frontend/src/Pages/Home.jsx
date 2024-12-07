import React from "react";
import student from "../img/rem.png";
import About from "../Components/About";
import Shap from "./Shap";
import InfoCard from "../Components/InfoCard";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div
        className=" relative
        bg-slate-950 w-auto  mt-[5vw]"
      >
        {/* one div container entire wdth */}
        <div
          className="
         bg-slate-950 w-10/12 max-w-[1080px]  flex flex-col justify-between  items-center   mx-auto"
        >
          {/* one div */}
          <div className=" space-y-8">
            <h1 className=" font-semibold text-[40px] leading-[1.2]  text-white ">
              Question Paper
            </h1>

            <div className=" w-6 h-1 bg-green-50"></div>

            <p className=" font-mullish leading-7  text-[18px] opacity-70  text-white">
              Embar on your quest for excellence with access to a goldmine of
              questions
              <br />
              that hold the key to unlocking your academic{" "}
              <b>Potential ,Prepare</b>
              <br />
              with
              <b>
                Precision , Practice with Purpose and achieve remarkable
                results.
              </b>
            </p>
            
            <button
              className=" 
              py-[14px] px-[18px]
                   hover:bg-slate-50 hover:text-black
            font-mullish transition-all  rounded-md   text-white
             bg-orange-500"
            >
              Contribute paper
            </button>

            <Link to='/view/paper'>
            <button
              className="
              py-[14px] px-[18px] 
                   hover:bg-slate-50 hover:text-black
            font-mullish transition-all rounded-md   text-white
              bg-slate-700"
            >
              View paper
            </button>
            </Link>
     
          </div>
          {/* nxt div img */}
          <img className=" w-full max-w-[680px]" src={student} alt="" />
          {/* shape triangle */}
          <div>
            <Shap />
          </div>
        </div>
      </div>

      <InfoCard />
      <br></br>

      {/* about of the page */}
      <About />
      <br></br>
      <Footer />
    </div>
  );
}

export default Home;
