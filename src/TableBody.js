
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
const TBody=({rowsPerPage, 
              userarray, 
              currentPage,
              checkboxarray,
              doEdit,
              handleonClick,
              handleDeleteBtn,
              handleEdit,
              handleEditTablerow})=>{
    return(
        <>
        {
             (rowsPerPage > 0
                ? userarray.slice(
                    (currentPage-1) * rowsPerPage ,
                    (currentPage-1) * rowsPerPage + rowsPerPage
                  )
                : userarray
              ).map((row ,index) => (
                  
                    <TableRow
                    key = {index}
                    role = "checkbox"
                    name={row.name}
                    checked = {checkboxarray.includes(row.id)}
                    className={checkboxarray.includes(row.id)?"selectedRow":"normalRow"}
                    sx = {{ cursor: "pointer" }}
                  >
                    {doEdit === row.id ? (
                    <>
                    <TableCell key={row.id}>
                      <Checkbox  hover checked={checkboxarray.includes(row.id)} 
                      onClick = {(event) => handleonClick(event.target.checked , row.id)}/>
                    </TableCell>
                    <TableCell component="th" scope="row" id="rowEdit">  <input name="name" value={row.name} onChange={(event)=>handleEditTablerow(event , row.id)}/>
                      {row.name}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right"> <input name="email" value={row.email} onChange={(event)=>handleEditTablerow(event , row.id)}/>
                      {row.email}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right"> <input name="role" value={row.role} onChange={(event)=>handleEditTablerow(event , row.id)}/>
                      {row.role}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                    <IconButton aria-label="edit">
                      <ModeEditOutlineOutlinedIcon onClick={()=>handleEdit()}/>
                    </IconButton>
                    <IconButton aria-label="delete" variant="contained" color="error">
                      <DeleteOutlineOutlinedIcon onClick={(event)=>handleDeleteBtn(event ,index)}/>
                    </IconButton>
                    </TableCell>
                    </>
                  
                ):(
                   <>
                      <TableCell key={row.id}>
                        <Checkbox  hover checked={checkboxarray.includes(row.id)} 
                        onClick = {(event) => handleonClick(event.target.checked , row.id)}/>
                      </TableCell>
                      <TableCell component="th" scope="row" id="rowEdit" >
                        {row.name}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {row.email}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {row.role}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                      <IconButton aria-label="edit">
                        <ModeEditOutlineOutlinedIcon onClick={()=>handleEdit(row.id)}/>
                      </IconButton>
                      <IconButton aria-label="delete" variant="contained" color="error">
                        <DeleteOutlineOutlinedIcon onClick={(event)=>handleDeleteBtn(event ,index)}/>
                      </IconButton>
                      </TableCell>
                      </>
                    )}
                    </TableRow>))}
        </>
    )
}
export default TBody