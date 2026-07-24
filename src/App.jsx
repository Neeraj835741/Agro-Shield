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
import Auth from "./pages/Auth";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main style={{ padding: "30px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<FarmerProfile />} />
          <Route path="/crop-calendar" element={<CropCalendar />} />
         <Route path="/report" element={<ReportProblem />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/health-history" element={<HealthHistory />} />
        <Route path="/support" element={<Experts />} />
          <Route path="/community" element={<Community />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;