import { Link } from "react-router-dom"
import Doc from "../../../Components/Doc/Doc"


const SignUp = () => {
    const {signup}=Doc()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="bg-white shadow-lg rounded-lg flex flex-col-reverse lg:flex-row max-w-6xl p-8 lg:p-12 h-auto lg:h-[700px] mt-16">
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

        {/* Signup Form Section */}
        <div className="w-full lg:w-1/2 px-6 lg:px-8 py-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Create an Account
          </h2>
          <form className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
              <input
                type="text"
                placeholder="First Name"
                className="w-full lg:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full lg:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 transition-colors duration-300">
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-gray-600 text-center">
            Already have an account?
            <Link to="/signin"className="text-indigo-500 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp