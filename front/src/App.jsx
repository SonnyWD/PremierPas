import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import MainLayout from "./assets/mainLayout";
import Tools from "./pages/toolsPages/tools"
import Discover from "./pages/discover";
import UserProfile from "./pages/userProfile";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

function App() {

  return (
    <BrowserRouter>
    <ToastContainer position="top-center" autoClose={3000} />
    <MainLayout>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tools" element={<Tools/>}/>
        <Route path="/discover" element={<Discover/>}/>
        <Route path="/userProfile" element={<UserProfile/>}/>
      </Routes>
    </MainLayout>
    </BrowserRouter>
  );
}

export default App;
