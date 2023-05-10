import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box"
import "./Home.css"

const PaginationButtons = ({userarray, currentPage ,setcurrentPage, rowsPerPage }) => {
  let pages=0;
  for( let i = 0 ; i<Math.ceil(userarray.length/rowsPerPage);i++){
    pages++;
  }
  const handleChange=(event , value)=>{
    setcurrentPage(value);
  }
  return (
   <>
      <Box className="paginate-btn">
        <Pagination
        count={pages}
        page={currentPage}
        showFirstButton
        showLastButton
        color="primary"
        name={currentPage}
        onChange={handleChange}
      />
      </Box>
     </>
  );
};
export default PaginationButtons;