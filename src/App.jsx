import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import FarmerProfile from "./pages/FarmerProfile";
import CropCalendar from "./pages/CropCalendar";
import ReportProblem from "./pages/ReportProblem";
import Alerts from "./pages/Alerts";
import HealthHistory from "./pages/HealthHistory";
import Experts from "./pages/Experts";
import Community from "./pages/Community";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main style={{ padding: "30px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<FarmerProfile />} />
          <Route path="/crop-calendar" element={<CropCalendar />} />
          <Route path="/report-problem" element={<ReportProblem />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/health-history" element={<HealthHistory />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;