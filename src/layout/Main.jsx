import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";


const Main = () => {
    return (
        <div>
            {/* Navbar */}
             <Navbar></Navbar>
            {/* Outlet */}
             <Outlet></Outlet>
            {/* Footer*/}
        </div>
    );
};

export default Main;