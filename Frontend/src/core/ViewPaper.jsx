import React from "react";
import { motion } from "framer-motion";
import Footer from "../Components/Footer";
import { SemesterBranchSelector } from "./SearchFilteration";

const UniversityPaper = () => {
  return (
    <div className="bg-slate-950 ">    
        <SemesterBranchSelector/>
    </div>
  );
};

export default UniversityPaper;
