/* eslint-disable no-irregular-whitespace */
import {  FaMapMarkerAlt} from "react-icons/fa"
import Doc from "../../Components/Doc/Doc"
import { useState } from "react";
import PopularCard from "../../Components/Home/PopularSpots/PopularCard";

const DetailsPage = () => {
    const {jinguShrine} =Doc()
    const [showMore, setShowMore] = useState(false);

    const toggleReadMore = () => {
      setShowMore(!showMore);
    };
  return (
    <div className="bg-gray-100 py-10 px-5">
      <div className="container mx-auto mt-16 md:mt-24">
        {/* Main grid container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left section with image and description */}
          <div className="lg:col-span-2   rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-4">Tokyu Plaza Omotesando Harajuku</h1>

            {/* Image */}
            <img src={jinguShrine} alt="Tokyu Plaza" className="w-full h-auto rounded-lg mb-4" />

            {/* Description */}
            <p className="text-gray-600 mb-4">
              Tokyu Plaza is a multi-storey department store in the Omotesando/Harajuku district
              of central Tokyo. Opened in 2012 and designed by the architect Hiroshi Nakamura, the
              shopping complex is known for its eye-catching entrance portal.
            </p>
            <p className="text-gray-600">
              {showMore
                ? `The escalators lead visitors through a kaleidoscope of mirrors and offer a popular
                photo opportunity on the busy streets of Omotesando in the open air. This place has
                become one of the most popular spots in Tokyo for taking pictures due to its unique
                architecture and reflective mirrors. Visitors often spend time here enjoying the
                visual effects and the surrounding shopping opportunities.`
                : `The escalators lead visitors through a kaleidoscope of mirrors and offer a popular
                photo opportunity on the busy streets of Omotesando in the open air.`}
            </p>

            {/* Read More / Show Less Button */}
            <button
              onClick={toggleReadMore}
              className="text-red-500 font-2xl hover:underline mt-2"
            >
              {showMore ? "Show Less" : "Read More"}
            </button>
          </div>

          {/* Right section with overview details */}
          <div className="  rounded-lg p-6 space-y-4  md:mt-12">
            <h2 className="text-2xl md:text-4xl font-semibold">Overview</h2>


            {/* Address */}
            <div className="text-gray-700 md:text-xl">
                
              <h3 className="font-semibold flex items-center gap-2 text-[#404040]"> <FaMapMarkerAlt />Address:</h3>
              <p>4 Chome-30-3 Jingumae, Shibuya City, Tokyo 150-0001</p>
            </div>

            {/* Hours */}
            <div className=" font-semibold text-[#404040]">
              <h3 className="font-semibold text-xl">Hours:</h3>
              <p>11:00 - 21:00 (Closed now)</p>
            </div>

            {/* Phone Number */}
            <div className=" text-[#404040]">
              <h3 className="font-semibold text-xl">Phone Number:</h3>
              <p>+81 80 4136 4488 </p>
            </div>

            {/* Website */}
            <div className="text-gray-700">
              <h3 className="font-semibold">Website:</h3>
              <a href="https://omohara.tokyu-plaza.com" className="text-indigo-500 hover:underline">
                omohara.tokyu-plaza.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* bottom part */}
      <p className="container mx-auto text-4xl font-semibold mt-12">Same Category Here..</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <PopularCard/> 
      <PopularCard/> 
      <PopularCard/> 
      <PopularCard/> 
      </div>
      
    </div>
  )
}

export default DetailsPage