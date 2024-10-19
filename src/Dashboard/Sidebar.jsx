import { useEffect, useRef, useState } from "react";
import { IoMdApps } from "react-icons/io";
import { FaRegBookmark, FaUserAlt } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";

import { Link, useLocation } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import Doc from "../Components/Doc/Doc";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logo4 } = Doc();
  const { pathname } = useLocation();
  const trigger = useRef(null);
  const sidebar = useRef(null);

  let storedSidebarExpanded = "true";
  const [sidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen, sidebar, trigger, setSidebarOpen]);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const [isLargeDevice, setIsLargeDevice] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsLargeDevice(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <aside
      ref={sidebar}
      className={`bg-white shadow absolute left-0 top-0 z-50 flex flex-col h-screen overflow-y-hidden duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen
          ? isLargeDevice
            ? "translate-x-0 w-0 bg-white"
            : "translate-x-0 w-[250px] bg-white"
          : "-translate-x-full w-[250px] bg-white"
      }`}
    >
      {/* Sideber Header Start*/}
      <div className="flex items-center justify-between h-[90px] z-999 text-[#A04747] py-[20px] px-[15px] ">
        <Link to="/" className=" font-semibold hover:cursor-pointer ">
          <img
            src={logo4}
            className=" w-12 md:w-24 h-12 md:h-24 ml-4 object-cover"
            alt="logo"
          />
        </Link>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden  text-2xl font-bold text-[#A04747]"
        >
          <svg
            className="fill-current"
            width="16"
            height="16"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* Sideber Header Close*/}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear p-4 border-r">
        <nav className=" flex flex-col gap-[24px]">
          <ul className="mb-6 flex flex-col gap-1">
            <li>
              <Link
                to="/"
                className={` group relative flex items-center gap-2 rounded-sm my-2 font-medium duration-200 text-[#A04747] ease-in-out hover:bg-graydark  ${
                  pathname === "/" ? "bg-gray-300 p-1" : "text-[#6C757D]"
                }`}
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  fontStyle: "normal",
                  lineHeight: "normal",
                  fontFamily: "",
                }}
              >
                <IoHomeOutline />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/alldestination"
                className={` group relative flex items-center gap-2 rounded-sm my-2 font-medium duration-200 text-[#A04747] ease-in-out hover:bg-graydark  ${
                  pathname === "/dashboard/alldestination"
                    ? "bg-[#A04747] p-3 rounded-xl text-white"
                    : "text-[#6C757D]"
                }`}
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  fontStyle: "normal",
                  lineHeight: "normal",
                  fontFamily: "",
                }}
              >
                <IoMdApps />
                Destination
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/allocation"
                className={` group relative flex items-center gap-2 rounded-sm my-2 font-medium duration-200 text-[#A04747] ease-in-out hover:bg-graydark  ${
                  pathname === "/dashboard/allocation"
                    ? "bg-[#A04747] p-3 rounded-xl text-white"
                    : "text-[#6C757D]"
                }`}
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  fontStyle: "normal",
                  lineHeight: "normal",
                  fontFamily: "",
                }}
              >
                <CiLocationOn />
                Location
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/bookings"
                className={` group relative flex items-center gap-2 rounded-sm my-2 font-medium duration-200 text-[#A04747] ease-in-out hover:bg-graydark  ${
                  pathname === "/dashboard/bookings"
                    ? "bg-[#A04747] p-3 rounded-xl text-white"
                    : "text-[#6C757D]"
                }`}
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  fontStyle: "normal",
                  lineHeight: "normal",
                  fontFamily: "",
                }}
              >
                <FaRegBookmark />
                Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/alluser"
                className={` group relative flex items-center gap-2 rounded-sm my-2 font-medium duration-200 text-[#A04747] ease-in-out hover:bg-graydark  ${
                  pathname === "/dashboard/alluser"
                    ? "bg-[#A04747] p-3 rounded-xl text-white"
                    : "text-[#6C757D]"
                }`}
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  fontStyle: "normal",
                  lineHeight: "normal",
                  fontFamily: "",
                }}
              >
                <FaUserAlt />
                Users
              </Link>
            </li>
            <li></li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
