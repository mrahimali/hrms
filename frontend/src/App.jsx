import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";
import AttendancePage from "./pages/AttendancePage";
import EmployeeAttendance from "./pages/EmployeeAttendance";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<EmployeesPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/attendance/:employeeId" element={<EmployeeAttendance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;