import './App.css'
import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import EmployeeAttendance from './pages/EmployeeAttendance';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/employees/:id/attendance" element={<EmployeeAttendance />} />
    </Routes>
    </>
  )
}

export default App
