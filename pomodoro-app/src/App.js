import React from "react";
import "./App.css";
import Main from "./components/Main.js";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="app">
          <Route path="/" component={Main} />
          <Main />
        </div>
      </Router>
    </div>
  );
}

export default App;
