import { Outlet, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";


export default function Root() {
    return (
      <>
        <Sidebar />
        <Navbar />
      </>
    );
  }