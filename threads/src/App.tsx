import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CreateThreadPage from "./pages/CreateThreadPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/threads/new" element={<CreateThreadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
