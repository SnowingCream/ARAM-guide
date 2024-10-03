import "./asset/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./component/Footer.jsx";
import Header from "./component/Header.jsx";
import Home from "./page/Home.jsx";
import Player from "./page/Player.jsx";
import Champion from "./page/Champion.jsx";

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player" element={<Player />} />
          <Route path="/champion" element={<Champion />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
