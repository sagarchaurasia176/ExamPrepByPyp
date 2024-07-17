import { NavLink } from "react-router-dom";
import logo from '../img/logoimg.png'
import LogIn from "../Auth/Validation/LogIn";
import RegisterLogin from "../Auth/Validation/RegisterLogin";
function Navbar() {
  return (
    <div>
      <header>
        <div>
          <nav className="  shadow-md   px-4  py-2.5 ">
            <div className="flex  flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <NavLink to="/" className="flex  justify-evenly w-11 items-center">
              <span className=" font-bold">PYP</span>
              
                </NavLink>

              {/* button logic */}
              <div className="flex items-center space-x-2 lg:order-2">
                {/* modal apply here */}
                <LogIn/>
                <RegisterLogin/>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
