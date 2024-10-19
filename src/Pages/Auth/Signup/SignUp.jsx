import { Link, useNavigate } from "react-router-dom"
import Doc from "../../../Components/Doc/Doc"

import { useState } from "react";
import { toast } from 'react-hot-toast';
import { userSignUp } from "../../../common/api/authApi";

const SignUp = () => {
    const {signup} = Doc()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "", 
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    
    const validatePassword = (password) => {
        const uppercasePattern = /[A-Z]/;
        const numberPattern = /[0-9]/; 
        const symbolPattern = /[^A-Za-z0-9]/;
        let error = "";

        if (!uppercasePattern.test(password)) {
            error = "Password must contain at least one uppercase letter.";
        } else if (!numberPattern.test(password)) {
            error = "Password must contain at least one number.";
        } else if (!symbolPattern.test(password)) {
            error = "Password must contain at least one special character.";
        } else if (password.length < 6) {
            error = "Password must be at least 6 characters long.";
        }

        return error;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        if (e.target.name === "password") {
            const validationError = validatePassword(e.target.value);
            setPasswordError(validationError); 
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(null);
      
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true); 
      
        try {
             await userSignUp({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNumber: formData.phoneNumber, 
                password: formData.password,
            });

            toast.success("User signed up successfully!");
            navigate("/signin");
        } catch (err) {
            setError(err.message || "Sign up failed");
            toast.error(err.message || "Sign up failed"); 
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-32">
            <div className="bg-white shadow-lg rounded-lg flex flex-col-reverse lg:flex-row max-w-6xl p-5 lg:p-0 h-auto lg:h-[700px] mt-16">
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
                <div className="w-full lg:w-1/2 px-6 lg:px-8 py-6 md:mt-20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Create an Account
                    </h2>

                    <form className="space-y-6" onSubmit={handleSignUp}>
                        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full lg:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A04747]"
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full lg:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A04747]"
                                required
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A04747]"
                            required
                        />
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A04747]"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${passwordError ? 'ring-red-500' : 'ring-[#A04747]'}`}
                            required
                        />
                        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>} 
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A04747]"
                            required
                        />
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <button
                            className={`w-full bg-[#A04747] text-white py-2 rounded-lg font-semibold transition-colors duration-300 ${
                                loading ? "cursor-not-allowed bg-gray-400" : "hover:bg-[#A04747]"
                            }`}
                            type="submit"
                            disabled={loading || passwordError}
                        >
                            {loading ? "Loading..." : "Sign Up"}
                        </button>
                    </form>
                    <p className="mt-4 text-gray-600 text-center">
                       <span className="mr-2">Already have an account?</span>
                        <Link to="/signin" className="text-[#A04747] font-semibold">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
