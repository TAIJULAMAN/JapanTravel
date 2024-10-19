import { useContext, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Doc from "../Components/Doc/Doc";
import { IoPersonOutline } from "react-icons/io5";
import { AuthContext } from "../Pages/Auth/AuthProvider/AuthProvider";

const Navbar = () => {
  const { user, loading, signOut } = useContext(AuthContext);
  const { logo4 } = Doc();
  const [menu, setMenu] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const navigate = useNavigate();

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const handleLogout = () => {
    signOut();
    navigate("/signin", { replace: true });
  };
  if (loading) return <p>Loading...</p>;
  return (
    <div className="z-40 fixed w-full md:px-[100px] px-[20px] bg-white text-[#A04747]">
      <div>
        <div className="flex flex-row justify-between items-center md:py-3 py-3">
          <div className="flex flex-row items-center cursor-pointer">
            <Link to="/" duration={500}>
              <div className="flex justify-center text-center items-center">
                <img
                  src={logo4}
                  className="w-16 md:w-24 h-12 md:h-24 object-cover"
                  alt="logo"
                />
                <div>
                  <p className="text-sm md:text-2xl font-semibold text-[#A04747]">
                    JAPAN TRAVEL AGENCY
                  </p>
                  <p className="text-sm  text-start font-semibold uppercase">
                    {" "}
                    and tour
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <nav className="font-semibold hidden lg:flex flex-row items-center text-xl gap-8">
            <Link
              to="/destination"
              duration={500}
              className="text-[#A04747] cursor-pointer"
            >
              Destination
            </Link>

            {user && (
              <Link to="/booking" duration={500} onClick={closeMenu}>
                Booking
              </Link>
            )}

            <Link
              to="/contact"
              duration={500}
              className="text-[#A04747] cursor-pointer"
            >
              Contact Us
            </Link>

            {user?.isAdmin && (
              <>
                <Link
                  to="/dashboard/alldestination"
                  duration={500}
                  className="text-[#A04747] cursor-pointer"
                >
                  Dashboard
                </Link>
              </>
            )}
          </nav>

          <div className="hidden lg:flex flex-row justify-between items-center gap-5">
            {!user ? (
              <Link to="/signin">
                <button className="text-xl shadow-lg text-[#A04747] font-semibold hover:bg-[#A04747] hover:text-white bg-white px-5 py-2 rounded-md transition duration-300 ease-in-out">
                  Sign In
                </button>
              </Link>
            ) : (
              <IoPersonOutline onClick={togglePopover} size={40} />
            )}
            {user && isPopoverOpen && (
              <div className="absolute text-xl font-semibold right-0 top-12 mt-16 w-52 bg-white rounded-lg shadow-lg p-5">
                <Link to="/profile" className="block text-[#A04747]">
                  Profile
                </Link>
                <Link to="/changePassword" className="block text-[#A04747]">
                  Change Password
                </Link>
                <Link to="/wishlist" className="block text-[#A04747]">
                  Wishlist
                </Link>
                <Link to="/cart" className="block text-[#A04747]">
                  Cart
                </Link>
                <p
                  className="text-[#A04747] font-semibold"
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </div>
            )}
          </div>

          <div className="lg:hidden flex items-center text-[#A04747] cursor-pointer">
            {menu ? (
              <AiOutlineClose size={28} onClick={handleChange} />
            ) : (
              <AiOutlineMenu size={28} onClick={handleChange} />
            )}
          </div>
        </div>

        <div
          className={`${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col absolute text-[#A04747] bg-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-5 w-full h-fit transition-transform duration-300`}
        >
          <Link to="/destination" duration={500} onClick={closeMenu}>
            Destination
          </Link>
          {user && (
            <Link to="/booking" duration={500} onClick={closeMenu}>
              Booking
            </Link>
          )}

          <Link
            to="/contact"
            duration={500}
            className="text-[#A04747] cursor-pointer"
          >
            Contact Us
          </Link>
          {user?.isAdmin && (
            <Link
              to="/dashboard/alldestination"
              duration={500}
              onClick={closeMenu}
              className="text-[#A04747] cursor-pointer"
            >
              Dashboard
            </Link>
          )}
          {user && (
            <Link to="/profile" className="block text-[#A04747]">
              Profile
            </Link>
          )}
          {user && (
            <Link to="/changePassword" className="block text-[#A04747]">
              Change Password
            </Link>
          )}
          {user && (
            <Link to="/wishlist" className="block text-[#A04747]">
              Wishlist
            </Link>
          )}
          {user && (
            <Link to="/cart" className="block text-[#A04747]">
              Cart
            </Link>
          )}

          {!user && (
            <div className="lg:hidden flex justify-center items-center gap-5">
              <Link to="/signin">
                <button className="text-xl shadow-lg text-[#A04747] font-semibold hover:bg-[#A04747] hover:text-white bg-white px-5 py-2 rounded-md transition duration-300 ease-in-out">
                  Sign In
                </button>
              </Link>
            </div>
          )}
          {user && (
            <div className="lg:hidden flex justify-center items-center gap-5">
              <button
                className="text-xl shadow-lg text-[#A04747] font-semibold hover:bg-[#A04747] hover:text-white bg-white px-5 py-2 rounded-md transition duration-300 ease-in-out"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
