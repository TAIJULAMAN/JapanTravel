

import { Link } from "react-router-dom";
import Doc from "../Doc/Doc";

const MustVisitDestination = () => {
  const { tokoyoTower, meijiJinguGaien, fuziMountain, omotesando } = Doc();
  const item = [
    {
      image: tokoyoTower,
      title: "Meiji Shrine",
      description:
        "Shrine dedicated to the deified spirits of Emperor Meiji and Empress Shoken.",
      number: "01",
    },
    {
      image: meijiJinguGaien,
      title: "Meiji Jingu Gaien",
      description:
        "This huge park in the heart of Tokyo is known for its numerous sports facilities.",
      number: "02",
    },
    {
      image: fuziMountain,
      title: "Illuminated tower",
      description:
        "180 lights that make up the typical light-up that illuminates Tokyo Tower.",
      number: "03",
    },
    {
      image: omotesando,
      title: "Omotesando Harajuku",
      description:
        "Tokyu Plaza is a multi-storey department store in the Harajuku district of central Tokyo.",
      number: "04",
    },
  ];
  return (
    <div className="mt-10 px-[20px] md:px-[100px]">
      <div className="text-center mb-10 text-[#212121]">
        <p className="text-5xl text-[#A04747]">Must Visited Destination </p>
        <p className="font-bold mt-2">
          Top Most Visit Tourist Destinations in Japan.Explore the Best of the
          Land of the Rising Sun
        </p>
      </div>
      <div className="flex flex-wrap flex-col md:flex-row gap-5 justify-center mx-auto max-w-screen-xl">
        {item.map((spot, index) => (
          <div key={index}>
            <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] mt-4 transition-transform duration-300 hover:scale-105">
              <div className="min-h-[256px] overflow-hidden">
                <img
                  src={spot.image}
                  className="h-72 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              <div className="p-5">
                <h3 className="text-black hover:text-[#A04747] text-2xl font-bold">
                  {spot.title}
                </h3>
                <p className="mt-4 text-base text-black leading-relaxed">
                  {spot.description}
                </p>
                <Link to="/destination">
                  <button
                    type="button"
                    className="mt-6 px-5 py-3 rounded-lg text-white text-base tracking-wider border-none outline-none relative overflow-hidden transition-all duration-300 group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#A04747] via-[#A04747] to-[#A04747] transition-all duration-300 opacity-75 group-hover:opacity-100 group-hover:scale-105"></span>
                    <span className="absolute inset-0 border-2 border-[#A04747] rounded-lg transform scale-110 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"></span>
                    <span className="relative">View More</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MustVisitDestination;
