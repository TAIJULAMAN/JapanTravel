import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TravelCard from "./TravelCard";
import Doc from "../../Doc/Doc";

const Travel = () => {
    const {kinkakuzi,naraPark,osaka,tokoyoTower}=Doc()
    const cardData = [
        {
          id: 1,
          title: "Mount Fuji",
          image: kinkakuzi,
          discount: "50% off",
          offerInfo: "5D/4N | People: 8 | Kyoto",
        },
        {
          id: 2,
          title: "Nara Park",
          image: naraPark,
          discount: "30% off",
          offerInfo: "3D/2N | People: 5 | Nara",
        },
        {
          id: 3,
          title: "Tokyo Tower",
          image: osaka,
          discount: "40% off",
          offerInfo: "4D/3N | People: 6 | Tokyo",
        },
        {
          id: 4,
          title: "Nara Park",
          image: naraPark,
          discount: "30% off",
          offerInfo: "3D/2N | People: 5 | Nara",
        },
        {
          id: 5,
          title: "Nara Park",
          image: tokoyoTower,
          discount: "30% off",
          offerInfo: "3D/2N | People: 5 | Nara",
        },
        {
          id: 6,
          title: "Nara Park",
          image: naraPark,
          discount: "30% off",
          offerInfo: "3D/2N | People: 5 | Nara",
        },
        {
          id: 7,
          title: "Nara Park",
          image: osaka,
          discount: "30% off",
          offerInfo: "3D/2N | People: 5 | Nara",
        },
        {
          id: 8,
          title: "Nara Park",
          image: kinkakuzi,
          discount: "30% off",
          offerInfo: "3D/2N | People: 5 | Nara",
        },
        
      ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragging, setDragging] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === cardData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? cardData.length - 1 : prev - 1));
  };

  const handleMouseDown = (e) => {
    setDragStartX(e.clientX);
    setDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const dragAmount = e.clientX - dragStartX;

    if (dragAmount > 50) {
      prevSlide();
      setDragging(false);
    }

    if (dragAmount < -50) {
      nextSlide();
      setDragging(false);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const calculatePosition = (index) => {
    const totalSlides = cardData.length;
    const angle = (index - currentSlide) * (280 / totalSlides);
  
    const smallDeviceTranslateZ = '50px';    
    const mobileTranslateZ = '30px';          
    const tabletTranslateZ = '50px';          
    const mediumDeviceTranslateZ = '200px';   
    const largeDeviceTranslateZ = '300px';    
    const veryLargeDeviceTranslateZ = '600px'; 
  
    let translateZValue;
    if (window.innerWidth <= 375) {
      translateZValue = smallDeviceTranslateZ;
    } else if (window.innerWidth <= 425) {
      translateZValue = mobileTranslateZ;
    } else if (window.innerWidth <= 768) {
      translateZValue = tabletTranslateZ;
    } else if (window.innerWidth <= 1024) {
      translateZValue = mediumDeviceTranslateZ;
    } else if (window.innerWidth <= 1440) {
      translateZValue = largeDeviceTranslateZ;
    } else {
      translateZValue = veryLargeDeviceTranslateZ;
    }
  
    return {
      transform: `rotateY(${angle}deg) translateZ(${translateZValue})`,
      opacity: index === currentSlide ? 1 : 0.2,
      filter: index === currentSlide ? 'none' : 'blur(4px)',
      zIndex: index === currentSlide ? 10 : 1,  
      transition: 'transform 0.7s, opacity 0.7s, filter 0.7s',
    };
  };

  return (
    <div className="px-4 md:px-8 lg:px-16">
      <p className="text-center text-xl text-[#202020] mt-10">Here are the other places that you must visit.</p>
      <h1 className="text-center mt-4 mb-10 text-3xl md:text-6xl font-semibold text-[#A04747] uppercase">
        Travel And InsPire your life
      </h1>
      <div
        className="relative flex justify-center items-center h-[500px] md:h-[600px] perspective-1000"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="relative w-[300px] h-full md:w-[400px] transform-style-preserve-3d ml-12">
          {cardData.map((card, index) => (
            <TravelCard
              key={card.id}
              card={card}
              calculatePosition={calculatePosition}
              index={index}
            />
          ))}
        </div>
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-6 md:left-12 lg:left-36 top-44 transform -translate-y-1/2 p-2 md:p-5 rounded-full bg-[#A04747] text-white"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 md:right-12 lg:right-40 top-44 transform -translate-y-1/2 rounded-full bg-[#A04747]  p-2 md:p-5 text-white"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Travel;
