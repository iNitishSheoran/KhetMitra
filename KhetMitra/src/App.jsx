import './App.css'
import { Routes, Route } from "react-router-dom";
import Body from './pages/Body';
import Signup from './pages/Signup';
import Login from './pages/Login';
import HelpForm from './pages/HelpForm';
import MyRequests from './pages/MyRequests';
import CropPage from './pages/CropPage';
// import AdminHelpPage from './pages/AdminHelpPage';

function App() {
  return (
    <div>
     
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/help" element={<HelpForm />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/cropDetails" element={<CropPage/>}/>
        {/*
        <Route path="/admin/help" element={<AdminHelpPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
