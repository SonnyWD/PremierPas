import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import MainLayout from "./assets/mainLayout";
import Tools from "./pages/toolsPages";
import Discover from "./pages/discoverPages/discover";
import UserProfile from "./pages/userProfilePages/userProfile";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import TodosList from "./pages/toolsPages/todolistTool/todoList";
import Baby from "./pages/toolsPages/babyTool/baby";
import Mood from "./pages/toolsPages/moodTool/mood";
import PrivateRoute from "./services/privateRoute";
import { UserProvider } from "./context/userContext";
import Welcome from "./pages/welcomePages/welcome";
import Community from "./pages/communityPages/community";
import BabyFeed from "./pages/toolsPages/babyTool/babyFeed";
import ManageTitleTodos from "./pages/toolsPages/todolistTool/manageTitleTodos"
import Nursing from "./pages/toolsPages/babyTool/nursing";

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer position="top-center" autoClose={3000} />
        <MainLayout>
          <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />

            <Route element={<PrivateRoute />}>
            <Route path="/welcome" element={<Welcome/>}/>

            <Route path="/tools" element={<Tools />}/>
            <Route path="tools/todolist" element={<TodosList />} />
            <Route path="/todos/mes-listes" element={<ManageTitleTodos />} />

            <Route path="tools/baby" element={<Baby />} />
            <Route path="/tools/baby/feed" element={<BabyFeed />}/>
            <Route path="/tools/baby/feed/nursing" element={<Nursing />}/>
            <Route path="tools/mood" element={<Mood />} />
            
            <Route path="/discover" element={<Discover/>}/>
            <Route path="/userProfile" element={<UserProfile/>}/>
            <Route path="/community" element={<Community />} />

            </Route>
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </UserProvider>
   
  );
}

export default App;
