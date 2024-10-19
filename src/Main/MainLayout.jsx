/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import Navbar from "../Sharred/Navbar";
import Footer from "../Sharred/Footer/Footer";
import { allUsers } from "../common/api/ApiKit";
import { useEffect } from "react";
import Whatsapp from "../Social/WhatsApp";

const MainLayout = () => {
    
  const getAllUsers = async () => {
    const users = await allUsers();

    
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Whatsapp/>
      <Footer />
    </div>
  );
};

export default MainLayout;
