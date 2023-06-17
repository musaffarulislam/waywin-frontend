import React, { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";

import User from "./routers/User";
import Admin from "./routers/Admin";
import Trainer from "./routers/Trainer";
import Theme from "./components/Theme/Theme";

import "./App.scss";

const App: FC = () => {

  return (
    <div>
      <Theme />
      <Router>
        <Routes>
          <Route path="/*" element={<User />}></Route>
          <Route path="/trainer/*" element={<Trainer />}></Route>
          <Route path="/admin/*" element={<Admin />}></Route>
        </Routes>
      </Router>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default App;
