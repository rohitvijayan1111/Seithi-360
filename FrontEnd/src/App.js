import { NavBar, ScrollToTop } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      
      <Outlet />
      <ScrollToTop />
    </>
  );
}

export default App;
