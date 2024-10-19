



const PopularTab = ({destinations, activeTab, setActiveTab }) => {
    

     
   const handleClick =(id)=>{

     setActiveTab(id)
      
  
   }

    return (
      <ul className="flex flex-wrap gap-5 justify-center mb-5">
        {destinations?.map((des) => (
           
          <li key={des.destination_id} className="mx-4">
            <button
             onClick={()=>handleClick(des.destination_id)}
              className={`font-bold pb-2 ${activeTab === des.destination_id ? 'text-red-600 border-b-4 border-red-600' : 'text-black'
                }`}
            >
              {des.name} 
            </button>
          </li>
        ))}
      </ul>
    );
  }
  
  export default PopularTab;
  