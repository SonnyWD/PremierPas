import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import MainLayout from "./assets/mainLayout";
import Tools from "./pages/toolsPages";
import Discover from "./pages/discover";
import UserProfile from "./pages/userProfile";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import TodosList from "./pages/toolsPages/todolistTool.jsx/todoList";
import Baby from "./pages/toolsPages/babyTool.jsx/baby";
import Mood from "./pages/toolsPages/moodTool.jsx/mood";
import PrivateRoute from "./services/privateRoute";

function App() {

  return (
    <BrowserRouter>
    <ToastContainer position="top-center" autoClose={3000} />
    <MainLayout>
    <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoute />}>
        <Route path="/tools" element={<Tools/>}/>
        <Route path="/discover" element={<Discover/>}/>
        <Route path="/userProfile" element={<UserProfile/>}/>
        <Route path="/todolist" element={<TodosList />} />
        <Route path="/baby" element={<Baby />} />
        <Route path="/mood" element={<Mood />} />

      </Route>
      </Routes>
    </MainLayout>
    </BrowserRouter>
  );
}

export default App;
