import './App.css'
<<<<<<< HEAD
import Navbar from './components/Navbar'
import Body from './pages/Body'
import About from './pages/About'
function App() {
=======
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Body from './pages/Body';

import HelpForm from './pages/HelpForm';
// import MyRequests from './pages/MyRequests';
// import AdminHelpPage from './pages/AdminHelpPage';
>>>>>>> c7e4f2288bc34cf48bcf37e2160edb6fe0b22fa1

function App() {
  return (
    <div>
<<<<<<< HEAD
      <Navbar/>
      <Body/>
      <About/>
=======
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/help" element={<HelpForm />} />
        {/* <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/admin/help" element={<AdminHelpPage />} /> */}
      </Routes>
>>>>>>> c7e4f2288bc34cf48bcf37e2160edb6fe0b22fa1
    </div>
  );
}

export default App;
