import { Link } from "react-router-dom"


const AdventureCart = ({ item }) => {
  return (
   <Link to='/destination'>
        <div className="flex flex-col items-center border-[5px] rounded-[10px] p-5">
      <img
        src={item.image}
        alt="Adventure"
        className="h-20 w-20 rounded-xl"
      />
      <p className="text-xl font-bold mt-2 text-white">{item.title}</p>
      <p className="text-base text-white">{item.destination}</p>
    </div>
   </Link>
  )
}

export default AdventureCart