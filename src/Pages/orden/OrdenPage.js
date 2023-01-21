import React, { useState, useEffect } from "react";
import DeskList from './OrdenList.js';
import Orden from './Orden'
import { getListOrdenView, deleteOrden,getListOrden } from '../../Services/OrdenService'
import OrdenNew from "./OrdenNew";
import OrdenUpdate from "./OrdenUpdate";
import { setFormatDate } from "../../utils/DateFormat";


import { AppContext } from "../../Context/AppContext";
import { Modal } from '../../Modal/index'
import './OrdenPage.css'

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

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function OrdenPage () {

  const { openModal, setOpenModal, ordenIdEdit, updating, setDeskIdEdit, setUpdating } = React.useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [orden, setOrden] = useState([]);

  useEffect(() => {
    getListOrdenView().then(data => {
      setOrden(data);
      setLoading(false);
    }
    );
  }, [openModal]);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
  }

  const onClickUpdate = (Id) => {
    setUpdating(true);
    setOpenModal(true);
    setDeskIdEdit(Id);
  }

  const onClickDelete = (ordenId) => {
    deleteOrden(ordenId).then( dataDel =>
      {
        getListOrdenView().then(data => {
          setOrden(data);
          setLoading(false);
        })

      }
      )
    }

  return (
    <div className="table-page-container">
      <div className="table-page">
        <h2>Ordenes</h2>
        <div className="button-container">
          <form onSubmit={onSubmit}>
          </form>
          
          <Button variant="outlined" className="button-new-product" onClick={handleClickOpen}>
            Nuevo
          </Button>

        </div>
          <dir/>
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell>Orden</TableCell> */}
                <TableCell align="left">Fecha</TableCell>
                <TableCell align="left">Cliente</TableCell>
                <TableCell align="left"><ListIcon /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orden.map((row) => (
                <TableRow key={row.id} 
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  
                  {/* <TableCell align="left">{row.id}</TableCell> */}
                  <TableCell align="left">{setFormatDate(row.createAt)}</TableCell>
                  <TableCell align="left">{row.clientes}</TableCell>
                  <TableCell align="left" >
                    <IconButton size="small" aria-label="edit" onClick={() => { onClickUpdate(row.id) }}>
                      <EditIcon fontSize="small"  color="info"/>
                    </IconButton>
                    <IconButton size="small" aria-label="delete"  onClick={() => { onClickDelete(row.id) }}>
                      <DeleteIcon fontSize="small" color="error" />
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
                    { updating ? <OrdenUpdate ordenId={ordenIdEdit} /> :<OrdenNew open={openModal}/> }
                  </Modal>
                )
        }
      
      </div>
       {/* <DeskNew open={openModal}  /> */}
       
    </div>
  );

}
export default OrdenPage ;