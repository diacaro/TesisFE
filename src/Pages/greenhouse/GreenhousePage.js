import React, { useState, useEffect } from "react";
import { getListGreenhouse, listByNameGreenhouse, deleteGreenhouse } from '../../Services/greenhouseService'
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
import DeleteIcon from '@mui/icons-material/Delete';

import { Modal } from '../../Modal/index'
import './GreenhousePage.css'
import { width } from "@mui/system";
import { Input, TextField } from "@mui/material";


function GreenhousePage() {

  const { openModal, setOpenModal, greenhouseIdEdit,setGreenhouseIdEdit, updating, setUpdating,  } = React.useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [invernaderos, setInvernaderos] = useState([]);
  const [itemSearch, setItemSearch] = useState('');

  useEffect(() => {

    getListGreenhouse().then(data => {
      setInvernaderos(data);
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
        setInvernaderos(data);

      }
      );
    else
      getListGreenhouse().then(data => {
        setInvernaderos(data);

      }
      );

  }

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const onChange = (event) => {
    if (event.target.name === 'itemSearch')
      setItemSearch(event.target.value)
  }
  
  const onClickUpdate = (id) => {
    console.log(id)
    setUpdating(true);
    setOpenModal(true);
    setGreenhouseIdEdit(id);
  }

  const onClickDelete = (InvernaderoId) => {
    deleteGreenhouse(InvernaderoId).then( dataDel =>
      {
        getListGreenhouse().then(data => {
          setInvernaderos(data);
          setLoading(false);
        })

      }
      )
    
  }
  

  return (
    <div className="greenhouse-page-container">
      <div className="greenhouse-page">
        <h2>Invernaderos</h2>
        <div className="button-container" >
          <form onSubmit={onSubmit}>
          </form>
          <button variant="outlined" className="button-new-greenhouse" onClick={handleClickOpen}>
            + Nuevo
          </button>
        </div>
        <div className="button-container">
          <div>
          <form onSubmit={onSubmit}>
            </form>
            <TextField 
              id="outlined-basic"
              border="none"
              name="itemSearch"
              value={itemSearch}
              onChange={onChange}
              placeholder="Invernadero"
            />
            <button type="submit" className="button-search-greenhousepage">Buscar</button>
            </div>
        </div>
    <div className="greenhouse-page-container-table">
    <TableContainer component={Paper}  >

      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Invernadero</TableCell>
            <TableCell align="left">Sede</TableCell>         
            <TableCell align="left"><ListIcon /></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody >
          {invernaderos.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left">{row.invernadero}</TableCell>           
              <TableCell align="left">{row.sede}</TableCell>           
              <TableCell align="left">
              <IconButton size="small" aria-label="update" onClick={() => { onClickUpdate(row.id) }}>
                <EditIcon fontSize="small" color="info" />
              </IconButton>
              <IconButton size="small" aria-label="delete"  onClick={() => { onClickDelete(row.id) }}>
                 <DeleteIcon fontSize="small" color="error"/>
              </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
        {/* {!!openModal &&
          (
            <Modal>
              {updating ? <GreenhouseUpdate invernaderoId={greenhouseIdEdit} /> : <GreenhouseNew />}
            </Modal>
          )
        } */}
      {!!openModal &&
              (
                <Modal>
                  { updating ? <GreenhouseUpdate invernaderoId={greenhouseIdEdit} /> :<GreenhouseNew open={openModal}/> }
                </Modal>
              )
      }

      </div>
       {/* <GreenhouseNew open={openModal} /> */}
      </div>
     
  );
}

export default GreenhousePage;