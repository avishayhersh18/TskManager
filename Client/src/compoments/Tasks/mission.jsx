import { useState, useEffect } from "react";
import { styles } from "../../utils/styles";
import { categories, statusArray, priArray } from "../../utils/Arrays";
import { useContext } from "preact/hooks";
import Context from "../../utils/context.jsx";
export default function Mission({
  id,
  name,
  priority,
  category,
  status,
  expression,
  isChecked,
  onChange,
  missionDelete,
  setMissionDelete,
  missionsToPresent,
  setMissionsToPresent,
  categories,
  dataUpdated,
  setDataUpdated,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const { state, dispatch } = useContext(Context);
  const [nameWidth, setNameWidth] = useState(null);
  const [editedContent, setEditedContent] = useState({
    name,
    priority,
    category,
    status,
    expression,
  });

  let missionData;

  useEffect(() => {
    if (isEditing) {
      setEditedContent({
        name,
        priority,
        category,
        status,
        expression,
      });
    }
  }, [isEditing, name, priority, category, status, expression]);

  const saveEditMission = async (id, editedContent) => {
    missionData = {
      id: id, // id of the task the server fills
      userId: JSON.parse(localStorage.getItem("user")).id,
      Name: editedContent.name,
      Status: editedContent.status,
      Due_date: editedContent.expression,
      Category: editedContent.category,
      Priority: editedContent.priority,
    };
    try {
      let response = await fetch(
        "/userTasks",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(missionData),
        },
      );

      const responseData = await response.json();

      if (response.status === 200) {
        setEditedContent(editedContent);
        //the response return tasks,user detail,and user
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        let index = tasks.findIndex((item) => item.id === id);
        let updateTasks = tasks.filter((item, index) => item.id !== id);
        updateTasks.splice(index, 0, responseData);
        localStorage.setItem("tasks", JSON.stringify(updateTasks));
        setDataUpdated(!dataUpdated);
      } else {
        console.error("Failed to save mission");
      }
    } catch (error) {
      console.error("Failed to save mission", error);
    }
  };

  const deleteMission = async (id) => {
    try {
      const missionToDelete = {
        id: id,
        userId: JSON.parse(localStorage.getItem("user")).id,
      };
      const response = await fetch(
        "/userTasks",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(missionToDelete),
        },
      );

      const responseData = await response.json();

      if (response.status === 200) {
        setEditedContent(editedContent);
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        let index = tasks.findIndex((item) => item.id === id);
        let updateTasks = tasks.filter((item, index) => item.id !== id);
        localStorage.setItem("tasks", JSON.stringify(updateTasks));
        let missions = JSON.parse(localStorage.getItem("task"));
        setMissionDelete(true);
        setMissionsToPresent(missions);
      } else {
        console.error("Failed to save mission");
      }
    } catch (error) {
      console.error("Failed to save mission", error);
    }
  };

  const onDeleteClick = () => {
    if (!isEditing) {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete the mission "${editedContent.name}"?`,
      );
      if (confirmDelete) {
        deleteMission(id);
      }
    } else {
      setEditedContent({
        name,
        priority,
        category,
        status,
        expression,
      });
      setIsEditing(!isEditing);
    }
  };

  const handleEditClick = () => {
    if (isEditing) {
      saveEditMission(id, editedContent);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "expression") {
      const formattedDate = new Date(value).toISOString().split("T")[0];
      setEditedContent((prevState) => ({
        ...prevState,
        [name]: formattedDate,
      }));
    } else {
      setEditedContent((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  useEffect(() => {
    if (missionsToPresent && missionsToPresent.length > 0) {
      // Calculate the maximum width required for the mission name
      let maxNameWidth = missionsToPresent.reduce((maxWidth, mission) => {
        const missionNameWidth = mission.Name.length * 8; // Assuming each character has an average width of 8px and adding 6 for the width of "Name: "
        return missionNameWidth > maxWidth ? missionNameWidth : maxWidth;
      }, 0);
      if (maxNameWidth < 100) {
        setNameWidth(maxNameWidth);
      } else {
        setNameWidth(100);
      }
      setNameWidth(maxNameWidth);
    }
  }, [missionsToPresent]);

  // Rest of the component code...

  return (
    <div
      style={styles.gradient_background}
      className="flex flex-col  m-1 p-1 rounded-lg border border-black shadow-gray dark:bg-neutral-700 dark:border-gray-700 dark:shadow-gray-700 sm:items-start md:items-start lg:items-center lg:flex-row "
    >
      <div className="flex text-black items-center justify-center">
        <input
          type="checkbox"
          checked={status === "Complete"}
          disabled
          className="text-black"
        />
      </div>
      <div class="ml-2">
        <span className="text-sm font-bold mr-1">Name:</span>
      </div>
      <div className="flex items-center m-2 justify-center">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedContent.name}
            onChange={handleInputChange}
            className={` w-32 ${styles.inputs}`}
          />
        ) : (
          <span
            className={`text-sm font-bold mr-1 ${
              nameWidth && `w-${nameWidth}`
            } font-mono text-white`}
            style={`width:${nameWidth}px;`}
          >
            {name}
          </span>
        )}
      </div>
      <div className="flex items-center  m-2 justify-center">
        <span className="text-sm font-bold mr-1">Priority:</span>
        {isEditing ? (
          <select
            name="priority"
            value={editedContent.priority}
            onChange={handleInputChange}
            className={`${styles.inputs} w-20 text-sm`}
          >
            {priArray.map((priorityOption) => (
              <option key={priorityOption} value={priorityOption}>
                {priorityOption}
              </option>
            ))}
          </select>
        ) : (
          <span className="w-20 font-mono text-white">
            {editedContent.priority}
          </span>
        )}
      </div>
      <div className="flex items-center  justify-center">
        <span className="text-sm font-bold mr-1">Category:</span>
        {isEditing ? (
          <select
            name="category"
            value={editedContent.category}
            onChange={handleInputChange}
            className={`w-25 text-sm  ${styles.inputs}`}
          >
            {categories?.map((category) => (
              <option key={category.Name} value={category.Name}>
                {category.Name}
              </option>
            ))}
          </select>
        ) : (
          <span className="w-24 font-mono text-white">
            {categories?.find((c) => c.Name === category)?.Name}
          </span>
        )}
      </div>
      <div className="flex items-center m-2 justify-center">
        <span className="text-sm font-bold mr-1">Status:</span>
        {isEditing ? (
          <select
            name="status"
            value={editedContent.status}
            onChange={handleInputChange}
            className={`${styles.inputs} w-24 text-sm`}
          >
            {statusArray.map((statusOption) => (
              <option key={statusOption} value={statusOption}>
                {statusOption}
              </option>
            ))}
          </select>
        ) : (
          <span className="w-32 font-mono text-white">{status}</span>
        )}
      </div>
      <div className="flex items-center m-2 justify-center">
        <span className="text-sm font-bold mr-1">Date:</span>
        {isEditing ? (
          <input
            type="date"
            name="expression"
            value={editedContent.expression}
            onChange={handleInputChange}
            className={`${styles.inputs} w-32 text-black text-sm`}
          />
        ) : (
          <span className="w-24 font-mono text-white">
            {new Date(expression).toLocaleDateString()}
          </span>
        )}
      </div>
      <div className="flex items-center m-2">
        <div className="flex">
          <button
            class={`bg-black hover:bg-gray-800 ${styles.mission_button}`}
            onClick={handleEditClick}
          >
            {isEditing ? (
              "Save"
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            )}
          </button>

          <button
            class={`bg-red-800 hover:bg-red-600 ${styles.mission_button}`}
            onClick={onDeleteClick}
          >
            {isEditing ? "Cancel" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
