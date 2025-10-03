import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapView from "./components/layout/MapView";
import BackgroundMap from "./components/layout/BackgroundMap";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapView />} />
        <Route path="/dash" element={<BackgroundMap />} />
      </Routes>
    </Router>
  );
}
