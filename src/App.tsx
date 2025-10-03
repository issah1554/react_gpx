import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapView from "./components/layout/MapView";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/map" element={<MapView />} />
      </Routes>
    </Router>
  );
}
