import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import AppNavigator from "./navigator/AppNavigator";
// hello :)

const initialState = {
  action: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MENU":
      return { action: "openMenu" };
    case "CLOSE_MENU":
      return { action: "closeMenu" };
    default:
      return state;
  }
};


const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

export default App;
