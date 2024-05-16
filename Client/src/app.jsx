import { pages } from "./compoments/General/pages";
import { useReducer } from "preact/hooks";
import Context from "./utils/context";
import { initState, reducer } from "./utils/reducer";

export function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {pages[state.view]}
    </Context.Provider>
  );
}
