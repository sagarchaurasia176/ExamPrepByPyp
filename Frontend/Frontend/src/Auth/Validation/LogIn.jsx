import React from "react";
import LoginForm from "./LoginForm";

const LogIn = () => {
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my_modal_6" className="btn">
        open modal
      </label>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      
      <div className="modal " role="dialog">
     
        <div className="modal-box  bg-red-300 w-[100%]">
      
          {/* login form page */}
          <LoginForm />
          {/* close  */}
      
        </div>
         
      </div>
    </div>
  );
};

export default LogIn;
