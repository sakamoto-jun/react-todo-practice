import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as StoreProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { store } from "./store";

const queryClient = new QueryClient();

function App() {
  return (
    <StoreProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StoreProvider>
  );
}

export default App;
