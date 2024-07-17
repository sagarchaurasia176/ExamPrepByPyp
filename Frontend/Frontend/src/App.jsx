import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <div className=" bg-slate-950">
        <Navbar />
      </div>
      {/* routes part */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
