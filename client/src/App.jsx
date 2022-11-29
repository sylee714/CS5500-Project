import { EthProvider } from "./contexts/EthContext";
import Main from "./components/Main"
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Main />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;

