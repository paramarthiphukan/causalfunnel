import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Quiz from "./pages/quiz";
import Submit from "./pages/submit";
import Answers from "./pages/answers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />{" "}
        <Route path="/submit" element={<Submit />} />
        <Route path="/answers" element={<Answers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
