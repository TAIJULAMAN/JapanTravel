
import Doc from '../../Doc/Doc'
import AdventureCart from './AdventureCart'
const BookingAdventure = () => {
    const {adventure,trekking,campfire,offroad,camping,exploring}=Doc()
  const AdventureItems = [
    {
      image: adventure,
      title: "Adventure",
      destination: "12 Destination"
    },
    {
      image: trekking,
      title: "Trekking",
      destination: "15 Destination"
    },
    {
      image: campfire,
      title: "Camp Fire",
      destination: "17 Destination"
    },
    {
      image: offroad,
      title: "Off Road",
      destination: "16 Destination"
    },
    {
      image: camping,
      title: "Camping",
      destination: "12 Destination"
    },
    {
      image: exploring,
      title: "Exploring",
      destination: "20 Destination"
    },
  ]
  return (
    <section className="px-[10px] md:px-[100px] py-20 bg-black text-white relative overflow-hidden">
      <div className="relative z-10 container mx-auto">
        <h2 className="text-xl md:text-5xl lg:text-5xl font-bold mb-10 text-center">ADVENTURE AND ACTIVITY</h2>
        <div className="px-[40px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {AdventureItems.map((item, index) => (
            <AdventureCart key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BookingAdventure