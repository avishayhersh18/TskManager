import React from 'react';
import { useEffect, useRef } from "react";
import {
    Chart,
    initTE,
  } from "tw-elements";
  export default function PieChart() {
    const chartRef = useRef(null);
    const tasks = JSON.parse(localStorage.getItem("tasks"));
  
    useEffect(() => {
      const getStatusListTasks = () => {
        let countTasks = [0, 0, 0, 0];
        tasks.forEach((obj) => {
          switch (obj.Status) {
            case "Complete":
              countTasks[0] += 1;
              break;
            case "Pending":
              countTasks[1] += 1;
              break;
            case "In Progress":
              countTasks[2] += 1;
              break;
            case "Stuck":
              countTasks[3] += 1;
              break;
            default:
              break;
          }
        });
        return countTasks;
      };
  
      const listTasks = getStatusListTasks();
  
      const dataPie = {
        type: "pie",
        data: {
          labels: ["Complete", "Pending", "In Progress", "Stuck"],
          datasets: [
            {
              label: "Status",
              data: listTasks,
              backgroundColor: [
                "rgb(60, 179, 113)",
                "rgb(134, 98, 226)",
                "rgb(134, 161, 226)",
                "rgb(255, 71, 93)",
              ],
            },
          ],
        },
      };
  
      if (chartRef.current) {
        // If chart instance already exists, update its data
        chartRef.current.data = dataPie.data;
        chartRef.current.update();
      } else {
        // Create new chart instance
        chartRef.current = new Chart(document.getElementById("pie-chart"), dataPie);
      }
  
      return () => {
        // Cleanup the chart reference when the component unmounts
        if (chartRef.current) {
          chartRef.current.destroy();
        }
      };
    }, [tasks]);
  
    return (
      <div className="mx-auto w-2/5 overflow-hidden" style={{ marginTop: "color: white" }}>
        <canvas id="pie-chart"></canvas>
      </div>
    );
  }