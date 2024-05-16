import React from "react";
import { styles } from "../../utils/styles";
import { useContext } from "preact/hooks";
import User from "../Profile/userProfile";
import {FiLogOut} from "react-icons/fi";
import Context from "../../utils/context";
import logoImage from "../../assets/TskManagerLogoRemovebg.png";

export default function Menu() {
  const { state, dispatch } = useContext(Context);

  const LogOut = () => {
    localStorage.clear();
    location.reload(); //refresh the page
  };

  return (
    <div className="flex justify-between bg-black text-white items-center w-full py-2 px-4 md:px-10 md:mb-8 lg:px-20  rounded-none border-b-2 border-gray-950  top-0 right-0 left-0 shadow">
      <div className="flex items-start">
        <img className="w-20 h-15 mx-4 md:mx-8" src={logoImage} alt="logo" />
      </div>
      <div className="flex items-center">
        <div className="flex justify-center items-center">
          <div
            className={`${styles.menu}`}
            onClick={() => {
              dispatch({ type: "SET_VIEW", param: "home" });
            }}
          >
            Home
          </div>
          <div
            className={`${styles.menu} `}
            onClick={() => dispatch({ type: "SET_VIEW", param: "about" })}
          >
            About
          </div>
          <div
            className={`${styles.menu} `}
            onClick={() => dispatch({ type: "SET_VIEW", param: "contant_us" })}
          >
            Contact us
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end items-center">
        <User />
        <button
          className="flex justify-center self-center text-white  py-1 rounded"
          onClick={LogOut}
        >
          <FiLogOut size={24}/>
        </button>
      </div>
    </div>
  );
}
