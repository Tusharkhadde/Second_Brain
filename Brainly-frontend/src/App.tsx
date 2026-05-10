import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SigninPage } from "@/pages/SigninPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { SharedBrainPage } from "@/pages/SharedBrainPage";
import { LandingPage } from "@/pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/brain/:sharelink" element={<SharedBrainPage />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
