import { useLocation } from "react-router-dom";
import Nav from "../components/nav";

function MainLayout({ children }) {
  const location = useLocation();
  const hideLayoutOnPaths = ["/login", "/register", "/"];
  const hideLayout = hideLayoutOnPaths.includes(location.pathname);

  return (
    <div>
      {!hideLayout && <Nav />}
      
      <main>
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
