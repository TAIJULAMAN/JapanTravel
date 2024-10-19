import Doc from "../../Doc/Doc"

const Traveller = () => {
    const {naraPark, fuziMountain, omotesando}=Doc()
  return (
    <div className="mx-auto px-[20px] md:px-[100px] mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-1" data-aos="fade-right" data-aos-duration="3000">
          <h2 className="text-xl md:text-5xl font-semibold text-[#A04747]">BEST TRAVELER SHARED PHOTO</h2>
          <p className="mt-4 text-justify">
            Excellent opportunity to sample local cuisine and culture while seeing the main attractions.
            A good mix of modern, traditional, and historical sights or experiences. RYOKOU handled the transportation arrangements for us, making it simple for us to move between cities and nations.
          </p>
        </div>
        <div className="col-span-1 lg:col-span-1" data-aos="fade-up" data-aos-duration="3000">
          <img src={fuziMountain} alt="Travelers in Kyoto" className="rounded shadow-lg h-[300px]" />
        </div>
        <div className="col-span-1 lg:col-span-1" data-aos="fade-left" data-aos-duration="3000">
          <img src={omotesando} alt="Travelers in Tokyo" className="rounded shadow-lg h-[300px]" />
        </div>
        <div className="col-span-1 lg:col-span-1" data-aos="fade-right" data-aos-duration="3000">
          <img src={naraPark} alt="Travelers in Osaka" className="rounded shadow-lg h-[300px]" />
        </div>
        <div className="col-span-1 lg:col-span-2" data-aos="fade-left" data-aos-duration="3000">
        <iframe  width="100%"  height="300" src="https://www.youtube.com/embed/G5RpJwCJDqc?si=8N1bkCwBnpY5ITEi" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  allowFullScreen></iframe>
        </div>
      </div>
    </div>
  )
}

export default Traveller