import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./Components/pages/HomePage";
import MenuPrincipale from "./Components/pages/MenuPrincipale";
import LoginForm from "./Components/pages/SeConnecteForm";
import ProfessorProfile from "./Components/pages/Profile";
function App() {
  const [activeTab, setActiveTab] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/menu" element={<MenuPrincipale />} />
        <Route path="/Connection" element={<LoginForm />} />
        <Route path="/Profile" element={<ProfessorProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
