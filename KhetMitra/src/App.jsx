import './App.css'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Body from './pages/Body';
import Login from './pages/Login';

import HelpForm from './pages/HelpForm';
import MyRequests from './pages/MyRequests';
import Signup from './pages/Signup';
import CropPage from './pages/CropPage';
// import MyRequests from './pages/MyRequests';
// import AdminHelpPage from './pages/AdminHelpPage';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/help" element={<HelpForm />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/cropData" element={<CropPage />} />
        {/*
        <Route path="/admin/help" element={<AdminHelpPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
