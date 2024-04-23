import { BrowserRouter, Routes, Route } from "react-router-dom";

import Accueil from "./pages/Accueil";
import HelloPage from "./pages/Hello";
import TestI from "./pages/Test1";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/TestI" element={<TestI />} />
        <Route path="/Accueil" element={<Accueil />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Hello" element={<HelloPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
