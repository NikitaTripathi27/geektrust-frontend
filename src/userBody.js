import * as React from "react";
import TableCell from "@mui/material/TableCell";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
// import TablecellEdit   from "./tablecelledit";
import EditTable from "./editTable";

const UserBody = ({
  rowsPerPage,
  userarray,
  currentPage,
  checkboxarray,
  doEdit,
  setdoEdit,
  setuserarray,
  setcheckboxarray,
  keyarray,
  setuserList,
}) => {
  /**
   *
   * @param {event} event
   * @param {String || Number} key
   * Funtion will find the key and will do the necessary changes
   * It will set the userarray as well
   */
  const handleEditTablerow = (event, key) => {
    const { name, value } = event.target;
    const valueEdited = userarray.map((item) =>
      item.id === key && name ? { ...item, [name]: value } : item
    );
    setuserarray(valueEdited);
    setuserList(valueEdited);
  };

  const saveItem = () => {
    setdoEdit(null);
  };

  return (
    <>
      {(rowsPerPage > 0
        ? userarray.slice(
            (currentPage - 1) * rowsPerPage,
            (currentPage - 1) * rowsPerPage + rowsPerPage
          )
        : userarray
      ).map((row, index) => (
        <TableRow
          key={index}
          role="checkbox"
          name={row.name}
          checked={checkboxarray.includes(row.id)}
          className={
            checkboxarray.includes(row.id) ? "selectedRow" : "normalRow"
          }
          sx={{ cursor: "pointer" }}
        >
          {doEdit === row.id ? (
            <>
              <TableCell component="th" scope="row" key={row.id}>
                <Checkbox checked={checkboxarray.includes(row.id)} />
              </TableCell>
              <TableCell id="rowEdit">
                {" "}
                <input
                  name="name"
                  value={row.name}
                  type="text"
                  onChange={(event) => handleEditTablerow(event, row.id)}
                />
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                <input
                  name="email"
                  value={row.email}
                  onChange={(event) => handleEditTablerow(event, row.id)}
                />
                {row.email}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                <input
                  name="role"
                  value={row.role}
                  onChange={(event) => handleEditTablerow(event, row.id)}
                />
                {row.role}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                <IconButton
                  aria-label="delete"
                  variant="contained"
                  color="error"
                  onClick={() => saveItem()}
                >
                  <SaveAltIcon color="Primary"  />
                </IconButton>
              </TableCell>
            </>
          ) : (
              <EditTable
                checkboxarray={checkboxarray}
                setcheckboxarray={setcheckboxarray}
                row={row}
                keyarray={keyarray}
                setdoEdit={setdoEdit}
                userarray={userarray}
                setuserarray={setuserarray}
                setuserList={setuserList}
              />
          )}
        </TableRow>
      ))}
    </>
  );
};
export default UserBody;
