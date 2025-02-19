import logo from "./logo.svg";
import "./App.css";
import { Quiz } from "./components/Quiz";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Quiz />
    </Provider>
  );
}

export default App;
