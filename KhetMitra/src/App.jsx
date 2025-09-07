import './App.css'
import { Routes, Route } from "react-router-dom";
import Body from './pages/Body';
import Signup from './pages/Signup';
import Login from './pages/Login';
import HelpForm from './pages/HelpForm';
import MyRequests from './pages/MyRequests';
import CropPage from './pages/CropPage';
import AdminAllHelp from './pages/AdminAllHelp';
import About from './pages/About';
import Diagnose from './pages/Diagnose';
import UserProfile from './pages/UserProfile';
import EditProfile from "./pages/EditProfile"

function App() {
  return (
    <div>
     
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/help" element={<HelpForm />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/cropData" element={<CropPage/>}/>
        <Route path="/allHelp" element={<AdminAllHelp/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/diagnose" element={<Diagnose/>} />
        <Route path="/myProfile" element={<UserProfile/>} />
        <Route path="/editProfile" element={<EditProfile/>} />
      </Routes>
    </div>
  );
}

export default App;
