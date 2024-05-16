let user = JSON.parse(localStorage.getItem("user"));
let tasks = JSON.parse(localStorage.getItem("tasks"));
let categories = JSON.parse(localStorage.getItem("categories"));
export const initState = {
  view: user === null ? "login" : "home",
  user_id: null,
  wallet: null,
  data: null,
  categories: categories,
  type: "",
  status: "",
  sort: "",
  search: "",
};

export const reducer = (state = InitState, action) => {
  switch (action.type) {
    case "SET_VIEW": {
      if (action.param !== "home") {
        return {
          ...state,
          view: action.param,
        };
      } else {
        return {
          ...state,
          view: action.param,
          type: "",
          status: "",
          sort: "",
          search: "",
        };
      }
      //copy the state parameter
    }
    case "SET_DATA":
      return {
        ...state,
        data: action.param,
      };
    case "SET_CAREGORIES":
      return {
        ...state,
        categories: action.param,
      };
    case "SET_DATA":
      return {
        ...state,
        user_id: action.param,
      };
    case "SET_TYPE":
      return {
        ...state,
        type: action.param,
      };
    case "SET_STATUS":
      return {
        ...state,
        status: action.param,
      };

    case "SET_SEARCH":
      return {
        ...state,
        search: action.param,
      };
    case "SET_SORT":
      return {
        ...state,
        sort: action.param,
      };

    default: {
      return state;
    }
  }
};
