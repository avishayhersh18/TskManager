import Mission from "./mission.jsx";
import { useState, useEffect } from "react";
import { styles } from "../../utils/styles.js";
import { useContext } from "preact/hooks";
import Context from "../../utils/context.jsx";
import {
  onSearch,
  onFilterChange,
  onSortChange,
  onStatusChange,
} from "../../utils/fucntions.js";
import { categories } from "../../utils/Arrays.js";

export default function Missions({
  searchQuery,
  filterType,
  sortParam,
  missionAdded,
  setMissionAdded,
  categories,
  searchButtonClicked,
  setSearchButtonClicked,
  statusFilter,
  setStatusParam,
}) {
  const [dataUpdated, setDataUpdated] = useState(false);
  const { state, dispatch } = useContext(Context);
  const [missionsToPresent, setMissionsToPresent] = useState(null);
  const [missionDelete, setMissionDelete] = useState(false);

  useEffect(() => {
    let missions = JSON.parse(localStorage.getItem("tasks"));
    if (state.data !== missions) {
      dispatch({ type: "SET_DATA", param: missions });
      setDataUpdated(true);
      setMissionsToPresent(state.data);
    }
  }, []);

  useEffect(() => {
    let missions = JSON.parse(localStorage.getItem("tasks"));
    dispatch({ type: "SET_DATA", param: missions });

    if (searchQuery !== "") missions = onSearch(searchQuery, missions);
    if (filterType !== "") missions = onFilterChange(filterType, missions);
    if (sortParam !== "") missions = onSortChange(sortParam, missions);
    if (statusFilter !== "") missions = onStatusChange(statusFilter, missions);

    setDataUpdated(true);
    setMissionsToPresent(missions);
    setMissionAdded(false);
  }, [
    searchButtonClicked,
    missionAdded,
    missionDelete,
    filterType,
    sortParam,
    statusFilter,
    dataUpdated,
  ]);

  return (
    <div className="m-15 10 flex flex-col justify-center">
      {missionsToPresent?.length > 0 ? (
        missionsToPresent.map((mission, index) => (
          <Mission
            categories={categories}
            missionDelete={missionDelete}
            setMissionDelete={setMissionDelete}
            dataUpdated={dataUpdated}
            setDataUpdated={setDataUpdated}
            missionsToPresent={missionsToPresent}
            setMissionsToPresent={setMissionsToPresent}
            className={styles.mission}
            id={mission.id}
            name={mission.Name}
            priority={mission.Priority}
            status={mission.Status}
            category={mission.Category}
            expression={mission.Due_date}
            isChecked={mission.isChecked}
            backgroundColor={mission.background}
            onChange={() => handleCheckboxChange(index)}
          />
        ))
      ) : (
        <span
          className="text-white font-semibold mt-8"
          style={{ alignSelf: "center" }}
        >
          Not have mission to present....
        </span>
      )}
    </div>
  );
}
