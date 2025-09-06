import './App.css'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Body from './pages/Body';
import About from './pages/About';

import HelpForm from './pages/HelpForm';
import Diagnose from './pages/Diagnose';
// import MyRequests from './pages/MyRequests';
// import AdminHelpPage from './pages/AdminHelpPage';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/help" element={<HelpForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/diagnose" element={<Diagnose />} />
        {/* <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/admin/help" element={<AdminHelpPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
