import "./App.css";
import axios from "axios";
import AllNav from "./components/AllNav";
import React, { useEffect, useState } from "react";

import { BrowserRouter as Router } from "react-router-dom";
axios.defaults.withCredentials = true;
//Main function
function App() {
  // Sprinner
  const [isLoading, setLoading] = useState(true);
  function fakeRequest() {
    return new Promise((resolve) => setTimeout(() => resolve(), 800));
  }

  useEffect(() => {
    fakeRequest().then(() => {
      const el = document.querySelector(".loader-container");
      if (el) {
        el.remove();
        setLoading(!isLoading);
      }
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <Router>
        <AllNav />
      </Router>
    </div>
  );
}

export default App;
