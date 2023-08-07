interface PaginationProps {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (pageNumber: number) => void;
  }
  
  const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    itemsPerPage,
    totalItems,
    onPageChange,
  }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    const handlePageClick = (pageNumber: number) => {
      if (pageNumber !== currentPage && pageNumber >= 1 && pageNumber <= totalPages) {
        onPageChange(pageNumber);
      }
    };
  
    const renderPageNumbers = () => {
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
  
      return (
        <ul className="pagination flex space-x-2 items-center"> 
          {currentPage > 1 && (
            <li
              className="page-item cursor-pointer"
              onClick={() => handlePageClick(currentPage - 1)}
            >
              <span className="page-link p-2 rounded-full text-2xl">&laquo;</span>
            </li>
          )}
  
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item cursor-pointer ${
                number === currentPage ? "font-semibold" : "font-normal"
              }`}
              onClick={() => handlePageClick(number)}
            >
              <span className="page-link p-2 rounded-full hover:bg-gray-200 text-2xl">
                {number}
              </span>
            </li>
          ))}
   
          {currentPage < totalPages && (
            <li
              className="page-item cursor-pointer"
              onClick={() => handlePageClick(currentPage + 1)}
            >
              <span className="page-link p-2 rounded-full  text-2xl">&raquo;</span>
            </li>
          )}
        </ul>
      );
    };
  
    return (
      <div>
        {renderPageNumbers()}
      </div>
    );
  };
  
  export default Pagination;
  