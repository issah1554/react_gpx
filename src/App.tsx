import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MapView from "./components/layout/MapView";
import BackgroundMap from "./pages/Index";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BackgroundMap />} />
      </Routes>
    </Router>
  );
}
