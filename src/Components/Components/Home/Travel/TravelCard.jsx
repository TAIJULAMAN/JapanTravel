/* eslint-disable react/prop-types */

import { BsFillCursorFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const TravelCard = ({ card, calculatePosition, index }) => {
  return (
    <div
      key={card.id}
      className="absolute w-64 h-80 md:w-72 md:h-96 lg:w-80 lg:h-96 rounded-lg shadow-lg transition-transform duration-700"
      style={calculatePosition(index)}
    >
      {/* Discount Badge */}
      <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1">
        {card.discount}
      </div>

      {/* Image */}
      <img
        src={card.image}
        alt={card.title}
        className="w-full h-48 md:h-64 object-cover rounded-t-lg cursor-move"
      />

      {/* Offer Info */}
      <div className="transform -mt-4 bg-white py-3 rounded-xl shadow-md text-xs font-semibold text-gray-700 border-2 border-black w-56 mx-auto">
        <p className="flex text-center justify-center">{card.offerInfo}</p>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#451717]">
            {card.title}
          </h3>
        </div>
        <Link
          to="/booking"
          className="text-blue-500 font-semibold text-sm md:text-lg mt-2 flex items-center justify-between"
        >
          <p>Book Now</p>
          <BsFillCursorFill className="text-2xl animate-moveLeftRight inline-block" />
        </Link>
      </div>
    </div>
  );
};

export default TravelCard;
