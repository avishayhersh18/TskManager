export function onSearch(searchTerm, missions) {
  if ((searchTerm !== null || searchTerm !== "") && missions != null) {
    return missions.filter((element, i) => {
      return element.Name.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
  } else {
    return missions;
  }
}

export function onStatusChange(filterStatus, missions) {
  if (filterStatus !== null && filterStatus !== "" && missions !== null) {
    return missions.filter((element) => {
      if (filterStatus === "No Complete") {
        return element.Status !== "Complete";
      } else {
        return element.Status === "Complete";
      }
    });
  } else {
    return missions;
  }
}
export function onFilterChange(filterType, missions) {
  if ((filterType !== null || filterType !== "") && missions !== null) {
    return missions.filter((element) => {
      return element.Category === filterType;
    });
  } else {
    return missions;
  }
}

export function onSortChange(sortParam, missions) {
  if (!missions || missions.length === 0) {
    return missions; // Return the original missions if the array is empty or not provided
  }

  // Sort missions based on the sortParam
  if (sortParam === "Name") {
    return missions.sort((a, b) =>
      a.Name && b.Name ? a.Name.localeCompare(b.Name) : 0,
    );
  } else if (sortParam === "Status") {
    return missions.sort((a, b) =>
      a.Status && b.Status ? a.Status.localeCompare(b.Status) : 0,
    );
  } else if (sortParam === "Date") {
    return missions.sort((a, b) =>
      a.Due_date && b.Due_date
        ? new Date(a.Due_date) - new Date(b.Due_date)
        : 0,
    );
  } else if (sortParam === "Category") {
    return missions.sort((a, b) =>
      a.Category && b.Category ? a.Category.localeCompare(b.Category) : 0,
    );
  } else if (sortParam === "Priority") {
    return missions.sort((a, b) =>
      a.Priority && b.Priority ? a.Priority.localeCompare(b.Priority) : 0,
    );
  } else {
    return missions; // Return the original missions if sortParam is invalid or not provided
  }
}
