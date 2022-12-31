import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./components/styles/App.css";
// import Login from "./components/Login";
import Home from "./components/Home";
import Invoice from "./components/Invoice";
import ShowMenu from "./components/ShowMenu";
import UpdateTax from "./components/UpdateTax";
import Stats from "./components/Stats";
import AddMenuItem from "./components/AddMenuItem";
import EditMenuItem from "./components/EditMenuItem";
import PrintInvoice from "./components/PrintInvoice";

const App = () => {
  const [authenticated, setAuthenticated] = useState(0);
  const [foodData, setFoodData] = useState([]);
  const [rates, setRates] = useState({
    CGST: 0,
    SGST: 0,
  });
  const [billList, setBillList] = useState([]);
  const [billMetaData, setBillMetaData] = useState([]);

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
              <Home
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
            element={
              <UpdateTax
                authenticated={authenticated}
                rates={rates}
                setRates={setRates}
              />
            }
          />
          <Route
            path="/invoice"
            element={
              <Invoice
                authenticated={authenticated}
                foodData={foodData}
                setFoodData={setFoodData}
                billList={billList}
                setBillList={setBillList}
                billMetaData={billMetaData}
                setBillMetaData={setBillMetaData}
                rates={rates}
                setRates={setRates}
              />
            }
          />
          <Route
            path="/menu"
            element={
              <ShowMenu
                authenticated={authenticated}
                foodData={foodData}
                setFoodData={setFoodData}
              />
            }
          />
          <Route
            path="/addMenuItem"
            element={
              <AddMenuItem authenticated={authenticated} foodData={foodData} />
            }
          />
          <Route
            path="/editMenuItem/:food_id"
            element={
              <EditMenuItem authenticated={authenticated} foodData={foodData} />
            }
          />
          <Route
            path="/printInvoice"
            element={
              <PrintInvoice
                authenticated={authenticated}
                billMetaData={billMetaData}
                setBillMetaData={setBillMetaData}
              />
            }
          />
          <Route
            path="/showStats"
            element={<Stats authenticated={authenticated} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
