//https://masc-api.musicascode.com/mc/plugin/plugin%20guid/list/patch?page=1


import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFetchData } from "utilities/helper/helper";
import NewHeader from "../modules/NewHeader";



// Material Ui import
// import Switch from '@mui/material/Switch';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';

const SearchPlugin = () => {

  const [patches, setPatches] = useState([]);
  const [isFetchig, setIsFetchig] = useState(true);  

  const { token } = useSelector((state) => state.dashboard);


  useEffect(() => {
    setIsFetchig(true)
    //const url = `https://masc-api.musicascode.com/mc/plugin/${guid}/patch/list`; 
    //const url = `https://masc-api.musicascode.com/mc/plugin/${guid}/list/patch?page=1`;
    const url = `https://masc-api.musicascode.com/mc/plugin/plugin%20guid/list/patch?page=1`;
    getFetchData({url, token})
      .then((res) => ( res.json()))
      .then((patches) => setPatches(patches.patches))
      .catch(error => console.log(error))
      
    setIsFetchig(false)
    
  } , []);


  return (
    <div>
      <NewHeader />
      <div className="addButton__wrapper">
        <div className="bootstrap__switch"></div>
        <div>
          <Button className="mb-2">Add Plugin</Button>
        </div>
      </div>
      {/* React-bootstrap table example */}

      <div className="bootstrap__table">
        <h3>Search PLUGIN</h3>
        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
      
              <th>GUID</th>
              <th>Token Owner</th>
              <th>Location Bucket</th>
              <th>Plugin Guid</th>
            </tr>
          </thead>
          <tbody>
         {
           
          isFetchig || patches.length === 0 
            ?  <tr><td>Loading...</td></tr>
            : 
          patches.map(patch => (
          <tr key={patch.guid}>  
          <td>
          <Link to={`/search/plugin/${patch.guid}`}>{patch.guid}</Link> 
          </td>
          <td>{patch.token_owner}</td>
          <td>{patch.location_bucket}</td>
          <td>{patch.plugin_guid}</td>
        </tr>))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default SearchPlugin;
