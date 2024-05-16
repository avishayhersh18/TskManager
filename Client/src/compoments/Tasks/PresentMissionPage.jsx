import Filter from "./filters.jsx";
import { useState, useEffect } from "react";
import {
  onSearch,
  onFilterChange,
  onSortChange,
} from "../../utils/fucntions.js";
import { useContext } from "preact/hooks";
import Context from "../../utils/context.jsx";
import Layout from "../General/layout.jsx";
import AddMission from "./addMission.jsx";
import Missions from "./missions.jsx";
import NewCategory from "./NewCategory.jsx";
import { styles } from "../../utils/styles.js";

export default function PresentMissions() {
  const { state, dispatch } = useContext(Context);
  const [addFormShow, setAddFormShow] = useState(false);
  const [addCategoryShow, setAddCategoryShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusParam] = useState("");
  const [missionAdded, setMissionAdded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [sortParam, setSortParam] = useState("");
  const [searchButtonClicked, setSearchButtonClicked] = useState(false); // New state variable

  useEffect(() => {
    dispatch({
      type: "SET_DATA",
      param: JSON.parse(localStorage.getItem("tasks")),
    });
    setCategories(JSON.parse(localStorage.getItem("categories")));
  }, []);

  // Modified onSearch function to include searchButtonClicked parameter
  const handleSearch = () => {
    onSearch(searchQuery, searchButtonClicked); // Perform search only if search button is clicked
  };

  return (
    <div className="App">
      <Layout title="">
        {/* Pass the onSearch, onFilterChange, and onSortChange functions as props to the Menu component */}
        <Filter
          onSearch={handleSearch} // Use the modified onSearch function
          onFilterChange={onFilterChange}
          onSortChange={onSortChange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterType={filterType}
          setFilterType={setFilterType}
          sortParam={sortParam}
          setSortParam={setSortParam}
          statusFilter={statusFilter}
          setStatusParam={setStatusParam}
          categories={categories}
          searchButtonClicked={searchButtonClicked}
          setSearchButtonClicked={setSearchButtonClicked}
        />
        <div class={styles.component_background}>
          <div class="flex items-center justify-center ">
            {!addCategoryShow && !addFormShow && (
              <button
                onClick={() => setAddFormShow(true)}
                type="button"
                data-te-ripple-init
                data-te-ripple-color="light"
                class={styles.addMission_button}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="mr-1 h-4 w-4"
                >
                  <path
                    fill-rule="evenodd"
                    d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z"
                    clip-rule="evenodd"
                  />
                </svg>
                Add task
              </button>

              // <button
              //   class="bg-green-600 text-white px-4 py-2 mb-2 rounded"
              //   onClick={() => setAddFormShow(true)}
              // >
              //   Add Mission
              // </button>
            )}
            {addFormShow && (
              <AddMission
                addFormShow={addFormShow}
                SetAddFormShow={setAddFormShow}
                missionAdded={missionAdded}
                setMissionAdded={setMissionAdded}
                categories={categories}
              />
            )}
          </div>
          <div class="flex items-center justify-center">
            {!addCategoryShow && !addFormShow && (
              <button
                class="bg-blue-500 text-white px-4 py-2 mb-3 rounded"
                onClick={() => setAddCategoryShow(true)}
              >
                Add New Category
              </button>
            )}
            {addCategoryShow && (
              <NewCategory
                addCategoryShow={addCategoryShow}
                SetAddCategoryShow={setAddCategoryShow}
                categories={categories}
                setCategories={setCategories}
              />
            )}
          </div>
          <div class="w-content">
            <Missions
              searchQuery={searchQuery}
              filterType={filterType}
              sortParam={sortParam}
              missionAdded={missionAdded}
              setMissionAdded={setMissionAdded}
              categories={categories}
              searchButtonClicked={searchButtonClicked}
              setSearchButtonClicked={setSearchButtonClicked}
              setSortParam={setSortParam}
              statusFilter={statusFilter}
              setStatusParam={setStatusParam}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
}
