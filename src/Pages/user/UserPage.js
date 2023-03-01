import React, { useState, useEffect } from "react";
import User from './User'
import { getUser, deleteUser } from "../../Services/userService";
import UserNew from "./UserNew";

import { AppContext } from "../../Context/AppContext";
import { Modal } from '../../Modal/index'
import './UserPage.css'

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


function UserPage() {

  const { openModal, setOpenModal, deskIdEdit, updating, setDeskIdEdit, setUpdating } = React.useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUser().then(data => {
      setUser(data);
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

  const onClickDelete = (userId) => {
    deleteUser(userId).then( dataDel =>
      {
        getUser().then(data => {
          setUser(data);
          setLoading(false);
        })

      }
      )
    
  }

  return (
    <div className="table-page-container">
      <div className="table-user-page">
        <h2>Usuarios</h2>
        <div className="button-container">
          <form onSubmit={onSubmit}>
          
          <button variant="outlined" className="button-new-user" onClick={handleClickOpen}>
            + Nuevo 
          </button>

          </form>
        </div>
          <dir/>
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Usuario</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell align="left"><ListIcon /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="left">{row.user}</TableCell>
                  <TableCell align="left">{row.role}</TableCell>
                  <TableCell align="left" >
                    <IconButton size="small" aria-label="delete"  onClick={() => { onClickDelete(row.id) }}>
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <UserNew open={openModal} />
    </div>
  );
}

export default UserPage;