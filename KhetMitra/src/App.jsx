import './App.css'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Body from './pages/Body';
import Signup from './pages/Signup';
import Login from './pages/Login';
import HelpForm from './pages/HelpForm';
import MyRequests from './pages/MyRequests';
import CropPage from './pages/CropPage';
import About from './pages/About';
import Diagnose from './pages/Diagnose';
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
        <Route path="/cropData" element={<CropPage/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/diagnose" element={<Diagnose/>}/>

        {/*
        <Route path="/admin/help" element={<AdminHelpPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
