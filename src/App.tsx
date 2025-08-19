import { Provider as StoreProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { store } from "./store";

function App() {
  return (
    <StoreProvider store={store}>
      <RouterProvider router={router} />
    </StoreProvider>
  );
}

export default App;
