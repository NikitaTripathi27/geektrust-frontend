import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from '@mui/material/TableHead';
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import axios from "axios";
import Box from "@mui/material/Box";
import Paginate from "./Paginate";
import "../Home.css";
import UserBody from "./UserBody";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchUser from "./UserSearch";


/**
 * 
 * @typedef {Object} admin -The Details of user 
 * @property {String} id - id of User
 * @property {String} name - name of user
 * @property {String} email - email of user
 */
export default function UserTable(){
  const [currentPage, setcurrentPage] = React.useState(1);
  const rowsPerPage= 10;
  const [doEdit, setdoEdit] = React.useState(null);
  const [userarray, setuserarray] = React.useState([]);
  const [userList, setuserList] = React.useState([]);
  const [checkboxarray, setcheckboxarray] = React.useState([]);
  const [keyarray, setkeyarray] = React.useState([]);
  const [deleteSelectAll, setdeleteSelectAll] = React.useState(false);
  const [selectallList, setselectallList] = React.useState([]);
  const [debounceId, setdebounceId] = React.useState(0);
  const [checked , setchecked] = React.useState(false);
  /**
   * Perform the get User api call
   * set the admin users
   */
  const getUsers = async () => {
    const userlist = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    setuserarray(userlist.data);
    setuserList(userlist.data);
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const countPages = Math.ceil(userarray.length) / rowsPerPage;

  /**
   * @param {id} isChecked
   * function checks all boxes if button is clicked ,
   *  can be useful for deleting in future
   * if checkbox ia again checked then it unchecks the checkbox
   */
  const handleSelectAll = (isChecked) => {
    let selectall = [];
    let selectallkey = [];
    let unselectall = [];
    if (isChecked) {
      setchecked(!checked);
      for (
        let i = (currentPage - 1) * rowsPerPage;
        i < (currentPage - 1) * rowsPerPage + rowsPerPage;
        i++
      ) {
        selectall.push(userarray[i]);
        selectallkey.push(userarray[i].id);
        selectallList.push(userarray[i].id);
      }
      setdeleteSelectAll(true);
      setcheckboxarray(selectallkey);
    } else {
      setcheckboxarray(unselectall);
      setchecked(!checked)
    }
  };

  /**
   * Function to deletes only the selected checkbox based on values we selected
   * it can be chekbox of whole page or it can be selected checkboxes on the page
   */
  const handleSelectedDelete = () => {
    if (deleteSelectAll) {
      const newarr = userarray.filter((ele) => {
        return !selectallList.includes(ele.id);
      });
      
      setuserarray(newarr);
      setuserList(newarr);
      setcheckboxarray([]);
      setchecked(!checked)
    } else {
      const newarr = userarray.filter((ele) => {
        return !keyarray.includes(ele.id);
      });
      setuserarray(newarr);
      setuserList(newarr);
    }
  };
  return (
    <>
     <SearchUser 
        userList={userList}
        setuserarray={setuserarray}
        debounceId={debounceId}
        setdebounceId={setdebounceId}/>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={checked}
                color="primary"
                onClick={(event) => handleSelectAll(event.target.checked)}
              />
            </TableCell>
            <TableCell className="Main-header">Users</TableCell>
            <TableCell className="Main-header" align="right">
              Email
            </TableCell>
            <TableCell className="Main-header" align="right">
              Role
            </TableCell>
            <TableCell className="Main-header" align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            <>
            <UserBody
              rowsPerPage={rowsPerPage}
              userarray={userarray}
              currentPage={currentPage}
              checkboxarray={checkboxarray}
              doEdit={doEdit}
              setcheckboxarray={setcheckboxarray}
              setuserarray={setuserarray}
              setdoEdit={setdoEdit}
              keyarray={keyarray}
              setuserList={setuserList}
            />
            </>
          </TableBody>
        </Table>
    </TableContainer>
    <Box className="footer-btns">
          <Button
            variant="outlined"
            color="error"
            className="deletePosition"
            startIcon={<DeleteIcon />}
            onClick={handleSelectedDelete}
          >
            Delete
          </Button>
          <Paginate
            colSpan={3}
            countPages={countPages}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            setcurrentPage={setcurrentPage}
            userarray={userarray}
          />
        </Box>
    </>
  );
}
