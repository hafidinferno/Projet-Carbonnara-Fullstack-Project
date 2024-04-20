import { BrowserRouter, Routes, Route } from "react-router-dom";

import Accueil from "./pages/Accueil";
import HelloPage from "./pages/Hello";
import Test from "./pages/Test";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/Accueil" element={<Accueil />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Hello" element={<HelloPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
