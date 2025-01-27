import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Navbar/Footer";

const Main = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar></Navbar>
      {/* Outlet */}
      <div className="min-h-[calc(100vh-306px)]">
        <Outlet></Outlet>
      </div>
      {/* Footer*/}
      <Footer></Footer>
    </div>
  );
};

export default Main;
