import React, { useState, useEffect } from "react";
import { getListGreenhouse, listByNameGreenhouse } from '../../Services/greenhouseService'
import GreenhouseNew from "./GreenhouseNew.js";
import GreenhouseUpdate from './GreenhouseUpdate'
import { AppContext } from "../../Context/AppContext";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';

import { Modal } from '../../Modal/index'
import './GreenhousePage.css'

function GreenhousePage() {

  const { openModal, setOpenModal, greenhouseIdEdit,setGreenhouseIdEdit, updating, setUpdating,  } = React.useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [invernaderos, setGreenhouses] = useState([]);
  const [itemSearch, setItemSearch] = useState('');

  useEffect(() => {

    getListGreenhouse().then(data => {
      setGreenhouses(data);
      setLoading(false);
    }
    );
  }, [openModal]);

  const onClick = () => {
    setOpenModal(true)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (itemSearch)
      listByNameGreenhouse(itemSearch).then(data => {
        setGreenhouses(data);

      }
      );
    else
      getListGreenhouse().then(data => {
        setGreenhouses(data);

      }
      );

  }
  const onChange = (event) => {
    if (event.target.name === 'itemSearch')
      setItemSearch(event.target.value)
  }
  
  const onClickUpdate = (productId) => {
    setUpdating(true);
    setOpenModal(true);
    setGreenhouseIdEdit(productId);
  }

  return (
    <div className="greenhouse-page-container">
      <div className="greenhouse-page">
        <h2>Invernaderos</h2>
        <div className="button-container">
          <form onSubmit={onSubmit}>
            <input
              name="itemSearch"
              value={itemSearch}
              onChange={onChange}
              placeholder="Invernadero"
            />
            <button type="submit" className="button-new-greenhouse">Buscar</button>
          </form>
          
        </div>
        <dir/>

      <TableContainer component={Paper}>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Invernadero</TableCell>
            <TableCell align="left">Sede</TableCell>         
            <TableCell align="left"><ListIcon /></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {invernaderos.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left">{row.invernadero}</TableCell>           
              <TableCell align="left">{row.sede}</TableCell>           
              <TableCell align="left">
              <IconButton size="small" aria-label="delete" onClick={() => { onClickUpdate(row.id) }}>
                <EditIcon fontSize="small" color="info" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        {!!openModal &&
          (
            <Modal>
              {updating ? <GreenhouseUpdate invernaderoId={greenhouseIdEdit} /> : <GreenhouseNew />}
            </Modal>
          )
        }
      </div>
    </div>
  );
}

export default GreenhousePage;