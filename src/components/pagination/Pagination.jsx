import "./pagination.css";

const Pagination = ({ pages, currentPage, setCurrentPage}) => {
    const genratedPages = []
    for(let i = 1; i <= pages; i++) {
        genratedPages.push(i)
    }

    return (
       <div className="pagination">
        <button 
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="page previous"
            disabled={currentPage === 1}
            >
                previous
        </button>
        {genratedPages.map(page => (
            <div
             onClick={() => setCurrentPage(page)}
             key={page} className={currentPage === page ? "page active": "page" }
             >
                {page}
            </div>
        ))}
        <button 
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="page next"
            disabled={currentPage === pages}
        >
                next
        </button>
       </div>
    );
};

export default Pagination;