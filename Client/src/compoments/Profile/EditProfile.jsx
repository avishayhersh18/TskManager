import React from "react";
import { styles } from "../../utils/styles";
import Layout from "../General/layout.jsx";
import { useState, useEffect } from "preact/hooks";
import { useContext } from "preact/hooks";
import Context from "../../utils/context";

export default function EditProfile({ addEditShow, setEditFormShow }) {
  let user = JSON.parse(localStorage.getItem("user"));
  const { state, dispatch } = useContext(Context);
  const [name, setName] = useState(user.Name);
  const [phone, setPhone] = useState(user.Phone);
  const [email, setEmail] = useState(user.Email);
  const [address, setAddress] = useState(user.Address);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
    // Perform any additional logic or update operations here
  };

  const handleCancel = () => {
    setEditFormShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    user["Name"] = name;
    user["Phone"] = phone;
    user["Address"] = address;
    user["Email"] = email;

    // Send the PATCH request with the user data
    fetch("/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(user));
        setEditFormShow(false);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error edit user:", error);
      });
  };
  return (
    <div class="absolute top-12 left-0 right-0 bottom-50 flex justify-center items-center">
      <div
        class="max-w-md mx-20 w-50 p-3 bg-white text-white border-2 rounded-lg shadow-white mt-0 mb-20"
        style={styles.gradient_background}
      >
        <div class="py-6 ">
          <div class="flex flex-wrap justify-center">
            <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center"></div>
            <div>
              <div class="flex justify-end">
                <button
                  type="button"
                  className="bg-black-500 border-2 flex justify-end text-white px-2 py-1 rounded"
                  onClick={handleCancel}
                >
                  X
                </button>
              </div>
              <form
                id="edit_form"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
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
                    className="w-full text-black border border-gray-300 rounded px-3 py-2"
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
                    className="w-full text-black border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-black border-2 text-white px-1 py-1 mr-7 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
