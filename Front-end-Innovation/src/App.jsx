import { BrowserRouter, Routes, Route } from "react-router-dom";

import Accueil from "./pages/Accueil";
import Hello from "./pages/Hello";
import Test from "./pages/Test";
import AboutUs from "./pages/AboutUs";

import "./CSS/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/Accueil" element={<Accueil />} />
        <Route path="/AboutUs" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
