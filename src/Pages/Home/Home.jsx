import { BookingSection } from "../../Components/Home/Booking/BookingSection";
import Faq from "../../Components/Home/Faq/Faq";
import Travel from "../../Components/Home/Travel/Travel";
import Traveller from "../../Components/Home/Traveller/Traveller";
import VideoSlider from "../../Components/Home/VideoSlider";
import MustVisitDestination from "../../Components/MustVisitDestination/MustVisitDestination";
import Footer from "../../Sharred/Footer/Footer";

const Home = () => {
    return (
        <div>
            <VideoSlider />
            <MustVisitDestination />
            <div className="mt-10 md:mt-20">
                <BookingSection />
            </div>
            <Faq />
            <Travel />
            <Traveller />
        </div>
    )
}

export default Home;
