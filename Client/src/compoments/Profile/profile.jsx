import React from "react";
import { styles } from "../../utils/styles";

import Layout from "../General/layout.jsx";
import { useState, useEffect } from "preact/hooks";
import { useContext } from "preact/hooks";
import Context from "../../utils/context";
import EditProfile from "./EditProfile.jsx";
import PieChart from "./PieChart.jsx";
export default function About() {
  const { state, dispatch } = useContext(Context);
  const [addEditShow, setEditFormShow] = useState(false);
  let openTasks = 0;
  let priorityHighTasks = 0;
  let completeTasks = 0;
  let currentMonthTasks = 0;
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const currentDate = new Date();
  let currentMonth = currentDate.getMonth(); // Returns a zero-based index for the month (0 - January, 1 - February, etc.)

  //display the month as a string
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const getStatusTasks = () => {
    tasks.forEach((obj) => {
      if (obj.Status !== "Complete") {
        openTasks += 1;
      } else {
        completeTasks += 1;
      }
    });
    return openTasks;
  };
  const getPriorityTasks = () => {
    tasks.forEach((obj) => {
      if (obj.Priority === "High") {
        priorityHighTasks += 1;
      }
    });
    return priorityHighTasks;
  };
  const getCategoriesTasks = () => {
    let categoryList = [];
    tasks.forEach((obj) => {
      categoryList.push(obj.Category);
    });
    const uniqueArray = Array.from(new Set(categoryList));
    return uniqueArray.join(",");
  };
  const getCurrentMonthTasks = () => {
    let text = "";
    tasks.forEach((obj) => {
      const monthDate = parseInt(obj.Due_date.split("-")[1]);
      if (monthDate == currentMonth + 1) {
        if (obj.Status !== "Complete") {
          currentMonthTasks += 1;
        }
      }
    });
    if (currentMonthTasks === 0) {
      text =
        "For the current month, " +
        monthNames[currentMonth] +
        "  you have completed all your tasks, GOOD JOB.\n";
    } else {
      text =
        "For the current month, " +
        monthNames[currentMonth] +
        " ,you have " +
        currentMonthTasks +
        " tasks left to complete.\n";
    }
    return text;
  };
  return (
    <Layout title="">
      <div
        class="container my-15 px-6 mx-auto"
        style="margin-top: 150px; color: white;"
      >
        <section class="relative py-16 bg-blueGray-200">
          <div class="container mx-auto px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-black bg-opacity-20 w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div class="px-6">
                <div class="flex flex-wrap justify-center">
                  <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center"></div>
                  <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div class="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        class="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-6 py-2 rounded  sm:mr-2 mb-1  border-2 duration-150"
                        style={styles.gradient_background}
                        type="button"
                        onClick={() => {
                          if (!addEditShow) setEditFormShow(true);
                          else setEditFormShow(false);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  <div class="w-full lg:w-4/12 px-4 lg:order-1">
                    <div class="flex justify-center py-4 lg:pt-4 pt-8">
                      <div class="mr-4 p-3 text-center">
                        <span class="text-2xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {getStatusTasks()}
                        </span>
                        <span class="text-xl text-blueGray-400">
                          Open Tasks
                        </span>
                      </div>
                      <div class="lg:mr-4 p-3 text-center">
                        <span
                          class={
                            "text-2xl font-bold block uppercase tracking-wide text-blueGray-600"
                          }
                        >
                          {getPriorityTasks()}
                        </span>
                        <span class="text-xl text-blueGray-400">
                          High Priority
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-center mt-8">
                  <dev>
                    {addEditShow && (
                      <EditProfile
                        addEditShow={addEditShow}
                        setEditFormShow={setEditFormShow}
                      />
                    )}
                  </dev>
                  <h3 class="text-5xl font-semibold leading-normal text-blueGray-700 mb-2">
                    {JSON.parse(localStorage.getItem("user")).Name}
                  </h3>
                  <div class="text-xl leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    {JSON.parse(localStorage.getItem("user")).Address} ,{" "}
                    {JSON.parse(localStorage.getItem("user")).Phone}
                  </div>
                  <div class="mb-2 text-xl text-Gray-400 mt-4">
                    <i class="fas fa-briefcase mr-2 text-xl text-blueGray-400"></i>
                    Email: {JSON.parse(localStorage.getItem("user")).Email}
                  </div>
                </div>
                <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div class="flex flex-wrap justify-center">
                    <div class="w-full lg:w-9/12 px-4">
                      <p class="mb-1 text-xl leading-relaxed text-blueGray-700">
                        So far you have completed {completeTasks} missions.
                      </p>
                      <p class="mb-1 text-xl leading-relaxed text-blueGray-700">
                        {getCurrentMonthTasks()}
                      </p>
                      <p class="mb-1 text-xl leading-relaxed text-blueGray-700">
                        Your categories are {getCategoriesTasks()}.
                      </p>
                      <p class="mb-1 text-xl leading-relaxed text-blueGray-700">
                        Embrace the challenge and conquer your tasks, for each
                        completion brings you one step closer to achieving
                        greatness.
                      </p>
                    </div>
                  </div>
                  <div class="mt-10 py-10 border-t border-blueGray-200 text-center text-white">
                    <PieChart />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer class="relative bg-blueGray-200 pt-8 pb-6 mt-8">
            <div class="container mx-auto px-4">
              <div class="flex flex-wrap items-center md:justify-between justify-center"></div>
            </div>
          </footer>
        </section>
      </div>
    </Layout>
  );
}
