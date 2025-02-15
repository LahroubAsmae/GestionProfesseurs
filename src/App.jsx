import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./Components/pages/HomePage";
import MenuPrincipale from "./Components/pages/MenuPrincipale";

function App() {
  const [activeTab, setActiveTab] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/menu" element={<MenuPrincipale />} />
      </Routes>
    </Router>
  );
}

export default App;
