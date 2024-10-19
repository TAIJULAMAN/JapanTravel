import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    videoSrc: '/videos/vid9.mp4',
    title: 'Discover the Magic of Japan',
    description: 'Japan, a land where ancient temples coexist with neon-lit skyscrapers, offers an unparalleled travel experience. From the tranquil gardens of Kyoto to the bustling streets of Tokyo, this island nation enchants visitors with its perfect balance of tradition and modernity. Whether you’re a foodie, history buff, or adventure-seeker, Japan promises an unforgettable journey',
  },
  {
    videoSrc: '/videos/vid3.mp4',
    title: 'Discover the Magic of Japan',
    description: 'Japan, a land where ancient temples coexist with neon-lit skyscrapers, offers an unparalleled travel experience. From the tranquil gardens of Kyoto to the bustling streets of Tokyo, this island nation enchants visitors with its perfect balance of tradition and modernity. Whether you’re a foodie, history buff, or adventure-seeker, Japan promises an unforgettable journey',
  },
  {
    videoSrc: '/videos/vid4.mp4',
    title: 'Discover the Magic of Japan',
    description: 'Japan, a land where ancient temples coexist with neon-lit skyscrapers, offers an unparalleled travel experience. From the tranquil gardens of Kyoto to the bustling streets of Tokyo, this island nation enchants visitors with its perfect balance of tradition and modernity. Whether you’re a foodie, history buff, or adventure-seeker, Japan promises an unforgettable journey',
  }
];

const VideoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section id="home" className="relative bg-black h-[500px] md:h-[650px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-600 ease-in-out ${index === currentSlide ? 'opacity-100 ' : 'opacity-0 z-0'
            }`}
        >
          <video
            src={slide.videoSrc}
            loop
            autoPlay
            muted
            className="object-cover w-full h-full opacity-60 "
          ></video>
          <div className="absolute 

         top-[25%] md:top-[35%]  w-[100%] text-center z-30">

            <h1 className=" text-white font-bold text-[clamp(4rem,7vw,7rem)] leading-tight
          text-xl md:text-5xl md:mr-10">
              {slide.title}
            </h1>
            <p className="md:px-[250px] text-white mt-5 mr-7 md:mr-20 ml-7 md:ml-5 text-sm md:text-base">{slide.description}</p>
            <div className="mt-5 mr-7 md:mr-20 ml-7 md:ml-5 ">
              <Link to="/destination">
                <button className="relative text-base md:text-xl shadow-lg text-[#A04747] font-semibold hover:bg-[#A04747] hover:text-white  bg-white px-5 py-3 rounded-md transition duration-300 ease-in-out ">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
           {/* Image placed at the bottom */}
      <img
        src="/grad2.png"
        alt="Gradient"
        className="absolute bottom-0 left-0 w-full -z-0 "
      />
        </div>
      ))}

     
    </section>

  );
};

export default VideoSlider;
