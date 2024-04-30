import { BrowserRouter, Routes, Route } from "react-router-dom";

import Accueil from "./pages/Accueil";
import HelloPage from "./pages/Hello";
import TestI from "./pages/Test1";
import AboutUs from "./pages/AboutUs";
import TestII from "./pages/Test2";
import TestIII from "./pages/Test3";
import ResultPage from "./pages/ResultPage";
import TestV from "./pages/Test4";
import Test5 from "./pages/Test5";
import Test8 from "./pages/Test8";
import Test6 from "./pages/Test6";
import Test7 from "./pages/Test7";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/Test1" element={<TestI />} />
        <Route path="/Test2" element={<TestII />} />
        <Route path="/Test3" element={<TestIII />} />
        <Route path="/Test4" element={<TestV />} />
        <Route path="/Test5" element={<Test5 />} />
        <Route path="/Test6" element={<Test6 />} />
        <Route path="/Test7" element={<Test7 />} />
        <Route path="/Test8" element={<Test8 />} />
        <Route path="/Accueil" element={<Accueil />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Hello" element={<HelloPage />} />
        <Route path="/Results" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
