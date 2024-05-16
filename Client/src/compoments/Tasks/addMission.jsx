import { useEffect } from "preact/hooks";
import React, { useState } from "react";
import { useContext } from "preact/hooks";
import { styles } from "../../utils/styles";
import Context from "../../utils/context";
import { statusArray, priArray, categories } from "../../utils/Arrays";
const AddMission = ({
  addFormShow,
  SetAddFormShow,
  missionAdded,
  setMissionAdded,
  categories,
}) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [ShowErrorAddMission, setShowErrorAddMission] = useState(false);
  const [priority, setPriority] = useState("");
  const { state, dispatch } = useContext(Context);
  useEffect(() => {}, []);
  // let categories=state.categories;
  const handleCancel = () => {
    SetAddFormShow(false);
  };
  const HandleWithAddedMission = async (missionData) => {
    setMissionAdded(true);

    let tasks = JSON.parse(localStorage.getItem("tasks"));
    //let tasks=[]
    tasks.push(missionData);
    //dispatch({type:"SET_DATA",param:tasks})

    localStorage.setItem("tasks", JSON.stringify(tasks));
    SetAddFormShow(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the form data
    const missionData = {
      id: "", //id of task the server fill
      userId: JSON.parse(localStorage.getItem("user")).id,
      Name: name,
      Status: status,
      Due_date: date,
      Category: category,
      Priority: priority,
    };

    // Send the POST request with the mission data
    fetch("/userTasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(missionData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data or show a success message
        HandleWithAddedMission(data);
        setMissionAdded(true);
        // Reset the form fields
        setName("");
        setStatus("");
        setDate("");
        setCategory("");
        setPriority("");
        // setMissionAdded(false);
      })
      .catch((error) => {
        setShowErrorAddMission(true);
        setTimeout(() => {
          setShowErrorAddMission(false);
        }, 5000);
        console.error("Error adding mission:", error);
      });
  };

  return (
    <div
      style={styles.gradient_background}
      className="max-w-md mx-25 p-5  rounded-lg shadow-lg mb-3"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className={styles.text}>
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 text-black rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="status" className={styles.text}>
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 text-black rounded px-3 py-2"
            required
          >
            <option value="">Select status</option>
            {statusArray.map((statusOption) => (
              <option key={statusOption} value={statusOption}>
                {statusOption}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className={styles.text}>
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 text-black rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className={styles.text}>
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 text-black rounded px-3 py-2"
            required
          >
            <option value="">Select category</option>
            {categories?.map((categoryOption) => (
              <option key={categoryOption.Name} value={categoryOption.Name}>
                {categoryOption.Name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="priority" className={styles.text}>
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border border-gray-300 text-black rounded px-3 py-2"
            required
          >
            <option value="">Select priority</option>
            {priArray.map((priorityOption) => (
              <option key={priorityOption} value={priorityOption}>
                {priorityOption}
              </option>
            ))}
          </select>
        </div>
        <div class="flex">
          <button
            type="submit"
            className="bg-blue-500 text-white px-1 py-1 mr-7 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-1 py-1 rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
      <div>
        {" "}
        {ShowErrorAddMission && (
          <p class="text-red-800">The mission don't added please try again</p>
        )}
      </div>
    </div>
  );
};
export default AddMission;
