import Collections from "./pages/Collections";
import Tasks from "./pages/Tasks";
import "./index.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Collections />} exact />
        <Route path="/collections/:id" element={<Tasks />} />
      </Routes>
    </Router>
  );
};

export default App;
