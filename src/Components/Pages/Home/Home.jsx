import Faq from "../../Components/Home/Faq/Faq";
import Travel from "../../Components/Home/Travel/Travel";
import Traveller from "../../Components/Home/Traveller/Traveller";
import VideoSlider from "../../Components/Home/VideoSlider";
import MustVisitDestination from "../../Components/MustVisitDestination/MustVisitDestination";

const Home = () => {
  return (
    <div>
      <VideoSlider />
      <MustVisitDestination />
      <Faq />
      <Travel />
      <Traveller />
    </div>
  );
};

export default Home;
