import React from "react";
import Challengemode from "./components/challengemode/Challengemode";
import Regularmode from "./components/regularmode/Regularmode";
import Footer from "./components/footer/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="full-container">
        <Routes>
          <Route path="/" element={<Regularmode />} />
          <Route path="/challenge" element={<Challengemode />} />
          <Route
            path="/philosophy"
            element={<Regularmode mainCategoryID="1" />}
          />
          <Route path="/science" element={<Regularmode mainCategoryID="2" />} />
          <Route path="/music" element={<Regularmode mainCategoryID="3" />} />
          <Route
            path="/technology"
            element={<Regularmode mainCategoryID="4" />}
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
