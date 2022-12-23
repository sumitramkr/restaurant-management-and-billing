import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Invoice from "./components/Invoice";
import UpdateMenu from "./components/UpdateMenu";
import UpdateTax from "./components/UpdateTax";
import Stats from "./components/Stats";

const App = () => {
  const [authenticated, setAuthenticated] = useState(0);

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Login
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
              />
            }
          />
          <Route
            path="/home"
            element={<Home authenticated={authenticated} />}
          />
          <Route
            path="/tax"
            element={<UpdateTax authenticated={authenticated} />}
          />
          <Route
            path="/invoice"
            element={<Invoice authenticated={authenticated} />}
          />
          <Route
            path="/menu"
            element={<UpdateMenu authenticated={authenticated} />}
          />
          <Route
            path="stats"
            element={<Stats authenticated={authenticated} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
