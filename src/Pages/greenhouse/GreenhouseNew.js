import React, { useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { createGreenhouse } from '../../Services/greenhouseService'
import './GreenhouseNew.css'

import { InvoiceContext } from "../invoice/InvoiceContext";
import { createDesk } from '../../Services/deskService'


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function GreenhouseNew({ open }) {
  const { searchGreenhouse, setSearchGreenhouse } = React.useContext(InvoiceContext);
  const { setGreenhouseId, setOpenModal, setUpdating, GreenhouseNewInvoice, setGreenhouseNewInvoice } = React.useContext(AppContext);  
  const [greenhouse, setGreenhouse] = useState({ nui: '', fullname: '', address: ''});
  const [error, setError] = useState(false);
  const [fullname, setFullname] = useState('');

  const onClickSave = () => {

    if (!fullname) {
      setError(true)
    }
    else {
      createGreenhouse({
        fullname
      }).then(data => {
        setOpenModal(false);
        setSearchGreenhouse(data.fullname)
      })
    }
  }


  const onChange = (event) => {
    if (event.target.name === 'fullname')
      setFullname(event.target.value)

  }

  const handleClose = () => {
    setOpenModal(false);
  };

  return (

    <div>

    <Dialog open={open} onClose={handleClose} >
      <DialogTitle>Nuevo Cliente </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Indicación cliente: Ingresar nombres y apellidos completos
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nombres"          
          name="fullname"
          fullWidth
          onChange={onChange}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={onClickSave}>Guardar</Button>
      </DialogActions>
    </Dialog>
  </div>

  );

}

export default GreenhouseNew