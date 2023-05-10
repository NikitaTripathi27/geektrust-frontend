import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import axios from "axios";
import Box from '@mui/material/Box';
import Paginate from "./Paginate"
import "./Home.css"
import TBody from "./TableBody"
import DeleteIcon from '@mui/icons-material/Delete';

export default function BasicTable() {
  const [currentPage, setcurrentPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [doEdit , setdoEdit] = React.useState(null)
  const [userarray, setuserarray] = React.useState([]);
  const [UserList, setUserList] = React.useState([]);
  const [searchvalue , setsearchvalue] = React.useState('')
  const [checkboxarray , setcheckboxarray] = React.useState([]);
  const [keyarray , setkeyarray] = React.useState([]);
  const [deleteSelectAll , setdeleteSelectAll] = React.useState(false)
  const [selectallList , setselectallList] = React.useState([])

  const getUsers = async () => {
    const userlist = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    setuserarray(userlist.data);
    setUserList(userlist.data);
    
  };

  React.useEffect(() => {
    getUsers();
  }, []);
  
  const handleonClick = (isChecked , key) => {
    let temp = [...checkboxarray];
      if( !isChecked ){
        temp=temp.filter((ele)=>ele !== key)
        setcheckboxarray(temp);
     }  
    else{
      keyarray.push(key);
      temp.push(key);
      setcheckboxarray(temp);
    }
  };

  const handlefilter = (targetValue) => {
    let ValueFound =[];
    if (targetValue !== "") {
      
      const nameSearch = userarray.filter(
        (person) => person.name === targetValue );
      const emailSearch = userarray.filter(
        (person)=> person.email === targetValue);
      const roleSearch = userarray.filter(
        (person)=> person.role === targetValue);
     
      if(nameSearch.length !== 0){
        ValueFound = nameSearch;
        setuserarray(ValueFound)
      }     
      else if(roleSearch.length !== 0){
        ValueFound = roleSearch ;
        setuserarray(ValueFound);
      }
      else {
        ValueFound = emailSearch;
        setuserarray(ValueFound);
      }
     }
    else{
      setuserarray(UserList);
    }
  };
 
  const handleonChange=(sValue)=>{
    setsearchvalue(sValue);
    handlefilter(sValue);
  }

  const handleDeleteBtn=(index)=>{
    const dupearray = [...userarray]
    dupearray.splice(index,1)
    setuserarray(dupearray)
  }

  const handleSelectAll=(isChecked)=>{
    let selectall=[];
    let selectallkey=[]
    let unselectall=[]
    if(isChecked){
      for (let i = (currentPage-1) * rowsPerPage ; i <  (currentPage-1) * rowsPerPage + rowsPerPage ; i++ ){
        selectall.push(userarray[i]);
        selectallkey.push(userarray[i].id)
        selectallList.push(userarray[i].id)
      }
      setdeleteSelectAll(true)
      setcheckboxarray(selectallkey);
    }else{
      setcheckboxarray(unselectall);
    }
  }

  const countPages = Math.ceil(userarray.length) / rowsPerPage;

  const handleSelectedDelete=()=>{
    if(deleteSelectAll){
     const newarr = userarray.filter((ele)=>{ return !selectallList.includes(ele.id)})
     setuserarray(newarr);
     setcheckboxarray([]);
    }
    else{
      const newarr = userarray.filter((ele)=> { return !keyarray.includes(ele.id)})
      setuserarray(newarr);
    }
 
  }

  const handleEdit=(key)=>{
    setdoEdit(key)
  }
  const handleEditTablerow=(event , key)=>{
    const {name , value} = event.target;
    const list=[...userarray]
    const  val = list.filter((ele)=> ele.id === key);
    const editId = val.id
    list[editId][name] = value;
    setuserarray(list);
  }
  return (
    <TableContainer component={Paper}>
      <TextField
        name="search"
        placeholder="Search Name,Email or Role"
        variant="outlined"
        type="text"
        fullWidth
        onChange={(event)=>handleonChange(event.target.value)}
      />
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableRow>
          <TableCell><Checkbox color="primary" onClick={(event)=>handleSelectAll(event.target.checked)}/></TableCell>
          <TableCell className="Main-header">Users</TableCell>
          <TableCell className="Main-header" align="right">Email</TableCell>
          <TableCell className="Main-header" align="right">Role</TableCell>
          <TableCell className="Main-header" align="right">Action</TableCell>
        </TableRow>
        <TableBody>
          <TBody rowsPerPage={rowsPerPage}
          userarray={userarray}
          currentPage= {currentPage}
          checkboxarray={checkboxarray}
          doEdit={doEdit}
          handleonClick={handleonClick}
          handleDeleteBtn={handleDeleteBtn}
          handleEdit={handleEdit}
          handleEditTablerow={handleEditTablerow}/>
        </TableBody>
        <TableFooter>
         
        </TableFooter>
      </Table>
      <Box className="footer-btns" >
            
            <Button variant="outlined" color="error" className="deletePosition" startIcon={<DeleteIcon />}
            onClick={handleSelectedDelete}>
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
    </TableContainer>
  );
}
