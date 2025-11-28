import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Developers from "./pages/Developers/Developers";
import AddDeveloper from "./pages/Developers/sub/AddDeveloper";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Developers />} />
          <Route path="/add-developer" element={<AddDeveloper />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
