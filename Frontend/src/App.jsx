import "./App.css";
import "@radix-ui/themes/styles.css";

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import ViewPaper from "./core/ViewPaper";
function App() {
  return (
    <>
      <div className=" bg-slate-950">
    <Navbar/>
      </div>
      {/* routes part */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* view paper */}
        <Route path="/view/paper" element={<ViewPaper/>}></Route>
      </Routes>
    </>
  );
}

export default App;
