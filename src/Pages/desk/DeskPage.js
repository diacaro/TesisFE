import React, { useState, useEffect } from "react";
import DeskList from './DeskList.js';
import Desk from './Desk'
import { getListDeskView, deleteDesk } from '../../Services/deskService'
import DeskNew from "./DeskNew";
import DeskUpdate from "./DeskUpdate";


import { AppContext } from "../../Context/AppContext";
import { Modal } from '../../Modal/index'
import './DeskPage.css'

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


function DeskPage () {

  const { openModal, setOpenModal, deskIdEdit, updating, setDeskIdEdit, setUpdating } = React.useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [mesa, setMesa] = useState([]);

  useEffect(() => {
    getListDeskView().then(data => {
      setMesa(data);
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

  const onClickDelete = (deskId) => {
    deleteDesk(deskId).then( dataDel =>
      {
        getListDeskView().then(data => {
          setMesa(data);
          setLoading(false);
        })

      }
      )
    }

  return (
    <div className="table-page-container">
          <div className="table-page">
            <h2>Mesa</h2>
          
        <div className="button-container">
          <form onSubmit={onSubmit}>
          
          <button variant="outlined" className="button-new-deskpage" onClick={handleClickOpen}>
            + Nuevo
          </button>

          </form>
        </div>

        <TableContainer component={Paper}  >
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Mesa</TableCell>
                <TableCell align="left">Invernadero</TableCell>
                <TableCell align="left"><ListIcon /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mesa.map((row) => (
                <TableRow key={row.id} 
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  
                  <TableCell align="left">{row.mesa}</TableCell>
                  <TableCell align="left">{row.invernadero}</TableCell>
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
                    { updating ? <DeskUpdate mesaId={deskIdEdit} /> :<DeskNew open={openModal}/> }
                  </Modal>
                )
        }
      
      </div>      
    </div>
  );

}
export default DeskPage ;