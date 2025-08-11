import { Provider } from "react-redux";
import "./App.css";
import Layout from "./components/Layout";
import TodoContainer from "./components/TodoContainer";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <TodoContainer />
      </Layout>
    </Provider>
  );
}

export default App;
