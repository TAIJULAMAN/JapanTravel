const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <ul className="flex space-x-4 justify-center">
        <li
          className={`flex items-center justify-center shrink-0 cursor-pointer text-base font-bold w-10 h-10 rounded-lg ${
            currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-[#a04747]"
          }`}
          onClick={() => currentPage !== 1 && paginate(currentPage - 1)}
        >
          Prev
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={`flex items-center justify-center shrink-0 cursor-pointer text-base font-bold w-10 h-10 rounded-lg ${
              currentPage === number
                ? "bg-[#a04747] text-white border-[#a04747]"
                : "text-[#333] border-2 hover:bg-gray-50"
            }`}
          >
            {number}
          </li>
        ))}
        <li
          className={`flex items-center justify-center shrink-0 cursor-pointer text-base font-bold w-10 h-10 rounded-lg ${
            currentPage === pageNumbers.length
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#a04747]"
          }`}
          onClick={() =>
            currentPage !== pageNumbers.length && paginate(currentPage + 1)
          }
        >
          Next
        </li>
      </ul>
    );
  };
  
  export default Pagination;
  