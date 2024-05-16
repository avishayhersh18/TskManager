import React from "react";
import { styles } from "../../utils/styles";
import { useState, useEffect } from "preact/hooks";
import { useContext } from "preact/hooks";
import Context from "../../utils/context";
import ParentLayout from "./ParentLogin";

import logoImage from "../../assets/TskManagerLogoRemovebg.png";
// const form=document.querySelector("#login_form")
export default function Login() {
  const [userReturn, setUserReturn] = useState(false);
  const [ShowErrorLogin, setShowErrorLogin] = useState(false);
  const { state, dispatch } = useContext(Context);
  let flag = false;
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      LoginUser();
    }
  };
  const OpenRegister = () => {
    dispatch({ type: "SET_VIEW", param: "register" });
  };
  const LoginUser = async () => {
    const user = document.querySelector("#username_id").value;
    const password = document.querySelector("#password_id").value;
    
   fetch(`/user/${user}/${password}`)
      .then((response) => {

        if (response.status === 200) {
          return response.json(); // Return the Promise here
        } else {
          throw new Error("Invalid username or password");
        }
      })
      .then((data) => {
        const responseData =  data
        localStorage.setItem("user", JSON.stringify(responseData.user));
        localStorage.setItem("tasks", JSON.stringify(responseData.tasks));
        localStorage.setItem(
          "categories",
          JSON.stringify(responseData.categories),
        );
        dispatch({ type: "SET_DATA", param: responseData.tasks });
        dispatch({ type: "SET_USER", param: responseData.user["id"] });
        dispatch({ type: "SET_VIEW", param: "home" });
      }) .catch((error) => {
        setShowErrorLogin(true);
        setTimeout(() => {
          setShowErrorLogin(false);
        }, 4000);
      });
  };

  return (
    <ParentLayout>
      <div class="text-center">
        <img class="mx-auto w-100 h-90" src={logoImage} alt="logo" />
      </div>
      <form id="login_form">
        <p class="mb-4 bold font-semibold text-white">
          Please login to your account
        </p>

        <div class="relative mb-4" data-te-input-wrapper-init>
          <input
            type="text"
            class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="username_id"
            placeholder="Username"
            onKeyPress={handleKeyPress}
            required
          />

          <label
            for="exampleFormControlInput1"
            class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            Username
          </label>
        </div>

        <div class="relative mb-4" data-te-input-wrapper-init>
          <input
            type="password"
            class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="password_id"
            placeholder=""
            onKeyPress={handleKeyPress}
            required
          />

          <label
            for="exampleFormControlInput11"
            class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            Password
          </label>
        </div>

        <div class="mb-12 pb-1 pt-1 text-center">
          <button
            class="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
            type="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            onclick={LoginUser}
            style={styles.gradient_background}
          >
            Log in
          </button>
          {ShowErrorLogin && (
            <p class="text-red-600">The user or password not right</p>
          )}
        </div>

        <div class="flex items-center justify-between pb-6">
          <p class="mb-0 mr-2">Don't have an account?</p>
          <button
            type="button"
            class="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-5 hover:shadow-md"
            data-te-ripple-init
            data-te-ripple-color="light"
            onclick={OpenRegister}
          >
            Register
          </button>
        </div>
      </form>
    </ParentLayout>
  );
}
