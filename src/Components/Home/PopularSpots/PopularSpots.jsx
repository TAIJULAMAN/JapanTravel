import { useState, useEffect } from "react";
import PopularTab from "./PopularTab";
import PopularPlace from "./PopularPlace";
import { findAllDestination } from "../../../common/api/destinationApi";
import { getAllLocations } from "../../../common/api/locationApi";

const PopularSpots = () => {

    const [destinations, setDestinations] = useState([]); 
    const [, setLocation] = useState([]); 
   
    
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);
  
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const fetchDestinations = async () => {
          try {
            const data = await findAllDestination();
          
            setDestinations(data?.result);
            setActiveTab(data?.result[0]?.destination_id)
            setLoading(false);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
        const fetchLocation = async () => {
          try {
            const data = await getAllLocations();

            setLocation(data.result);
            setLoading(false);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchDestinations();
        fetchLocation();
      }, []);


    return (
        <div>
            <div className="pt-32 px-[20px] md:px-[100px] text-center mb-5 text-[#212121]">
                <h1 className="text-2xl md:text-5xl font-bold mb-4 text-[#A04747]">
                    OUR DESTINATION
                </h1>
                <p className="text-black">
                    Top Must-Visit Destinations in Japan: Carefully Handpicked for Your Unforgettable Travel Experience.
                </p>
            </div>

            <div className="mx-auto px-[20px] md:px-[100px] py-10">
                <PopularTab destinations={destinations} activeTab={activeTab} setActiveTab={setActiveTab} />
                <PopularPlace id={activeTab} />
            </div>
        </div>
    );
};

export default PopularSpots;
