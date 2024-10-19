import Doc from "../../Doc/Doc";

const Traveller = () => {
  const { naraPark, fuziMountain, omotesando } = Doc();
  return (
    <div className="mx-auto max-w-6xl   mb-10">
      <div className="text-center">
        <h2 className="text-xl md:text-5xl font-bold text-[#A04747]">
          BEST TRAVELER SHARED PHOTO
        </h2>
        <p className="mt-5 text-center px-[20px] pb-10">
          Excellent opportunity to sample local cuisine and culture while seeing
          the main attractions. A good mix of modern, traditional, and
          historical sights or experiences. RYOKOU handled the transportation
          arrangements for us, making it simple for us to move between cities
          and nations.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5  mx-auto px-[20px] ">
        <div>
          <img
            src={fuziMountain}
            alt="Travelers in Kyoto"
            className="rounded-lg shadow-lg "
          />
        </div>
        <div className="">
          <img
            src={omotesando}
            alt="Travelers in Tokyo"
            className="rounded-lg shadow-lg  "
          />
        </div>
        <div className="">
          <img
            src={naraPark}
            alt="Travelers in Osaka"
            className="rounded-lg shadow-lg "
          />
        </div>
      </div>
      <div className="mt-10 mx-auto max-w-6xl px-[20px] ">
        <div>
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/G5RpJwCJDqc?si=8N1bkCwBnpY5ITEi"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Traveller;
