import React, { useState, useEffect } from "react";
import { styles } from "../../utils/styles";
import { useContext } from "preact/hooks";
import Context from "../../utils/context";
import {
  onSearch,
  onFilterChange,
  onSortChange,
  onStatusChange,
} from "../../utils/fucntions.js";

const Filter = ({
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  sortParam,
  setSortParam,
  statusFilter,
  setStatusParam,
  categories,
  searchButtonClicked,
  setSearchButtonClicked,
}) => {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    dispatch({ type: "SET_SEARCH", param: searchQuery });
    dispatch({ type: "SET_TYPE", param: filterType });
    dispatch({ type: "SET_STATUS", param: statusFilter });
    dispatch({ type: "SET_SORT", param: sortParam });
  }, [searchQuery, filterType, sortParam, statusFilter]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchButtonClicked(false); // Reset the searchButtonClicked state when the search query changes
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    onFilterChange(e.target.value, state.data);
  };
  const handleFilterStatusChange = (e) => {
    setStatusParam(e.target.value);
    onStatusChange(e.target.value, state.data);
  };

  const handleSortChange = (e) => {
    setSortParam(e.target.value);
    onSortChange(e.target.value, state.data);
  };

  const reset = () => {
    dispatch({ type: "SET_SEARCH", param: "reseting all..." }); //for that the usestate reload
    dispatch({ type: "SET_SEARCH", param: "" });
    dispatch({ type: "SET_TYPE", param: "" });
    dispatch({ type: "SET_STATUS", param: "" });
    dispatch({ type: "SET_SORT", param: "" });
    // dispatch();
    setSearchQuery("");
    setFilterType("");
    setSortParam("");

    setStatusParam("");
    setSearchButtonClicked(false);
  };

  return (
    <div className={styles.filters}>
      <div className="flex items-center">
        <label htmlFor="filter" className={styles.text}>
          Filter Category:
        </label>
        <select
          id="filter"
          value={filterType}
          onChange={handleFilterChange}
          className={styles.inputs}
        >
          <option value="">All</option>
          {categories?.map((item) => {
            const categoryOption = state.data.some((dataItem) => {
              return dataItem.Category === item.Name;
            });
            return categoryOption ? (
              <option key={item.Name} value={item.Name}>
                {item.Name}
              </option>
            ) : null;
          })}
        </select>
      </div>

      <div className="flex items-center">
        <label htmlFor="status" className={styles.text}>
          Filter Status:
        </label>
        <select
          id="status"
          value={statusFilter}
          onChange={handleFilterStatusChange}
          className={styles.inputs}
        >
          <option value="">All</option>
          <option value="No Complete">No Complete</option>
          <option value="Complete">Complete</option>
        </select>
      </div>

      <div className="flex items-center">
        <div class="flex">
          <input
            type="text"
            class="w-full bg-white pl-2 text-base font-semibold outline-0"
            id="search"
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.inputs}
          />
          {!searchButtonClicked && (
            <button
              class="bg-black-700 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-gray-700 transition-colors"
              onClick={() => setSearchButtonClicked(true)}
            >
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                class=" w-5 fill-white transition"
              >
                <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <label htmlFor="sort" className={styles.text}>
          Sort by:
        </label>
        <select
          id="sort"
          value={sortParam}
          onChange={handleSortChange}
          className={styles.inputs}
        >
          <option value="">None</option>
          <option value="Name">Name</option>
          <option value="Status">Status</option>
          <option value="Date">Date</option>
          <option value="Category">Category</option>
          <option value="Priority">Priority</option>
        </select>
      </div>

      <div className="flex items-center justify-center m-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filter;
