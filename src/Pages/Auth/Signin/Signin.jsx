import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Doc from "../../../Components/Doc/Doc";
import { userProfile, userSignIn } from "../../../common/api/authApi";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Signin = () => {
  const { signup } = Doc();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/");
    }
  }, [navigate]);

  const from = location?.state?.pathname || "/";
  
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const data = await userSignIn(email, password);
      if (data?.result?.accessToken) {
        localStorage.setItem("authToken", data?.result?.accessToken);
  
        const profileData = await userProfile();
  
        // Dispatch the login action
        dispatch({ type: "LOGIN", payload: profileData.result });
  
        toast.success("Sign in successful!");
        navigate(from, { replace: true });
      } else {
        setError("Invalid login credentials");
      }
    } catch (err) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-32">
      <div className="bg-white shadow-lg rounded-lg flex flex-col-reverse lg:flex-row max-w-6xl p-5 md:p-0 h-auto lg:h-[700px] mt-16">
        {/* Left Image Section */}
        <div className="lg:flex w-full lg:w-1/2 items-center justify-center mb-8 lg:mb-0">
          <div className="relative w-full h-64 lg:h-full">
            <img
              src={signup}
              alt="Sign In Illustration"
              className="rounded-lg shadow-lg object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>
        </div>

        {/* Sign In Form Section */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 lg:px-8 py-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Sign In
          </h2>
          <form className="space-y-6" onSubmit={handleSignIn}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A04747]"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A04747]"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#A04747] text-white py-2 rounded-lg font-semibold transition-colors duration-300"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </form>

          <p className="mt-4 text-gray-600 text-center">
            <span className="mr-2">Dont have an account?</span>
            <Link to="/signup" className="text-[#A04747] font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;