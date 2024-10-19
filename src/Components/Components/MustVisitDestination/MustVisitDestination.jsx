/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import Doc from "../Doc/Doc";

const MustVisitDestination = () => {
    const {tokoyoTower,meijiJinguGaien,fuziMountain,omotesando,jinguShrine,sensojiTemple}=Doc()
    const item = [
        {
            image: tokoyoTower,
            title: 'Meiji Shrine',
            description: 'Shrine dedicated to the deified spirits of Emperor Meiji and Empress Shoken.',
            number: '01',
        },
        {
            image: meijiJinguGaien,
            title: 'Meiji Jingu Gaien',
            description: 'This huge park in the heart of Tokyo is known for its numerous sports facilities.',
            number: '02',
        },
        {
            image: fuziMountain,
            title: 'Illuminated tower',
            description: '180 lights that make up the typical light-up that illuminates Tokyo Tower.',
            number: '03',
        },
        {
            image: omotesando,
            title: 'Omotesando Harajuku',
            description: 'Tokyu Plaza is a multi-storey department store in the Omotesando / Harajuku district of central Tokyo.',
            number: '04',
        },
        {
            image: jinguShrine,
            title: 'Meiji Jingu Shrine',
            description: 'located in technologically advanced Tokyo and only a few minutes from the quirky streets of Harajuku.',
            number: '05',
        },
        {
            image: sensojiTemple,
            title: 'Sensoji Temple',
            description: 'Senso-ji Temple (浅草寺, Sensōji) is a popular spot for omikuji, or fortunes.',
            number: '06',
        },
    ];
    return (
        <div className="mt-10 px-[10px] md:px-[100px]">
            <div className="text-center mb-10 text-[#212121]">
                <p className="text-5xl text-[#A04747]">
                    Must Visited Destination              </p>
                <p className="text-xl font-bold mt-2">
                    Top Most Visit Tourist Destinations in Japan.Explore the Best of the Land of the Rising Sun
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {item.map((spot, index) => (
                    <div key={index}>
                        <div
                            className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] mt-4">
                            <div className="min-h-[256px]">
                                <img src={spot.image} className="h-72 object-cover" />
                            </div>

                            <div className="p-5">
                                <h3 className="text-gray-800 text-xl font-bold">{spot.title}</h3>
                                <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                                    {spot.description}
                                </p>
                                <Link to='/details/:id'>
                                <button type="button"
                                    className="mt-6 px-5 py-2.5 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-[#c34c4c] hover:bg-[#a04747]">View More</button>
                                 </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default MustVisitDestination