import "./App.css";
import "@radix-ui/themes/styles.css";

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import ViewPaper from "./core/ViewPaper";
import About from "./Components/About";
function App() {
  return (
    <>
      <div className="  sticky top-0 left-0 z-50 backdrop-blur-md ">
       <Navbar/>
      </div>
      {/* routes part */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* about */}
        {/* view paper */}
        <Route path="/view/paper" element={<ViewPaper/>}></Route>
      </Routes>
    </>
  );
}

export default App;
