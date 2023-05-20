import { TextField } from "@mui/material";


const SearchUser=({userList , setuserarray,debounceId,setdebounceId})=>{

      /**
   * @param {String} targetValue
   * Function returns users based on targetValue
   * targetValue can belong to any category,if its empty we will display all the users
   */

  const handleonChange = (targetValue) => {
    let newTarget = targetValue.toLowerCase();
    const searchValue = userList.filter(
      (person) =>
        person.name.toLowerCase().match(newTarget) ||
        person.email.toLowerCase().match(newTarget) ||
        person.role.toLowerCase().match(newTarget)
    );
    setuserarray(searchValue);
  };

  /**
   *
   * @param {event} event
   * Function will call handleonChange function after a given setTimeout
   */
  const debounceSearch = (event) => {
    if (debounceId) clearTimeout(debounceId);

    let timerId = setTimeout(() => {
      handleonChange(event.target.value);
    }, 500);
    setdebounceId(timerId);
  };
return(
    <>
    <TextField
          name="search"
          placeholder="Search Name,Email or Role"
          variant="outlined"
          type="text"
          className="tf"
          onChange={(event) => debounceSearch(event)}
        />
    </>
)
}
export default SearchUser