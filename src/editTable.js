import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import IconButton from "@mui/material/IconButton";
const EditTable = ({
  checkboxarray,
  setcheckboxarray,
  keyarray,
  row,
  setdoEdit,
  userarray,
  setuserarray,
  setuserList
}) => {
  /**
   * @param {checked} isChecked
   * @param {id} key
   * isChecked checks for check and uncheck of box
   *
   * Function checks the value of key in the array.
   * if checked then will include it in array
   * else will remove it from resulting array
   */
  const handleonClick = (isChecked, key) => {
    let temp = [...checkboxarray];
    if (!isChecked) {
      temp = temp.filter((ele) => ele !== key);
      setcheckboxarray(temp);
    } else {
      keyarray.push(key);
      temp.push(key);
      setcheckboxarray(temp);
    }
  };

  /**
   * @param {id} key
   * Function enables the row to edit values
   * if the edit matches the row id
   */
  const handleEdit = (key) => {
    console.log("sdfsdfdfsdf");
    setdoEdit(key);
  };

  /**
   * @param {Number} index
   * Function will delete the row data
   */
  const handleDeleteBtn = (key) => {
    const getAdmin = userarray.filter((item) => item.id !== key);
    setuserarray(getAdmin);
    setuserList(getAdmin);
  };

  return (
    <>
      <TableCell key={row.id} component="th" scope="row">
        <Checkbox
          checked={checkboxarray.includes(row.id)}
          onClick={(event) => handleonClick(event.target.checked, row.id)}
        />
      </TableCell>
      <TableCell  id="rowEdit">
        {row.name}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {row.email}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {row.role}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        <IconButton aria-label="edit" onClick={() => handleEdit(row.id)}>
          <ModeEditOutlineOutlinedIcon  />
        </IconButton>
        <IconButton aria-label="delete" variant="contained" color="error" onClick={() => handleDeleteBtn(row.id)}>
          <DeleteOutlineOutlinedIcon  />
        </IconButton>
      </TableCell>
    </>
  );
};

export default EditTable;
