import React from "react";
import { styles } from "../../utils/styles";
import { useState, useEffect } from "preact/hooks";
import { useContext } from "preact/hooks";
import Context from "../../utils/context";
import ParentLayout from "./ParentLogin";
export default function Register() {
  const { state, dispatch } = useContext(Context);
  const [name, setName] = useState("");
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleBackToLogin = () => {
    dispatch({ type: "SET_VIEW", param: "login" });
  };

  const handleCancel = () => {
    // Reset the form fields
    setName("");
    setUserName("");
    setPassword("");
    setPhone("");
    setEmail("");
    setAddress("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the form data
    const missionData = {
      Name: name,
      User_name: user_name,
      Password: password,
      Phone: phone,
      Email: email,
      Address: address,
    };

    // Send the POST request with the mission data
    fetch("/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(missionData),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "SET_VIEW", param: "login" });
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error adding mission:", error);
      });
  };
  return (
    <ParentLayout>
      <div className="block max-w-md mx-25  bg-black bg-opticy-20 rounded-lg-b ">
        <form id="login_form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border text-black border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="user_name" className="block mb-1 font-semibold">
              User Name
            </label>
            <input
              type="text"
              id="user_name"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full border text-black border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-semibold">
              Password
            </label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border text-black border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1 font-semibold">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border text-black border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold">
              Email Address
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border text-black border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block mb-1 font-semibold">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border text-black border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex">
            <button
              type="submit"
              className="bg-blue-500 text-white px-1 py-1 mr-7 rounded"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-1 py-1 rounded"
              onClick={handleCancel}
            >
              Clear
            </button>
          </div>
          <div>
            <button
              type="button"
              class={styles.button}
              style={styles.gradient_background}
              onClick={handleBackToLogin}
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </ParentLayout>
  );
}
