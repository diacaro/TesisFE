import React, { useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { createCustomer } from '../../Services/customerService'
import './CustomerNew.css'

import { InvoiceContext } from "../invoice/InvoiceContext";
// import { createAmbience } from '../../Services/ambienceService'


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function CustomerNew({ open }) {
  const { searchCustomer, setSearchCustomer } = React.useContext(InvoiceContext);
  const { setCustomerId, setOpenModal, setUpdating, customerNewInvoice, setCustomerNewInvoice } = React.useContext(AppContext);  
  const [customer, setCustomer] = useState({ fullname: '',phone: '', address: ''});
  const [error, setError] = useState(false);
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const onClickSave = () => {

    if (!fullname) {
      setError(true)
    }
    else {
      createCustomer({
        fullname,
        phone,
        address
      }).then(data => {
        setOpenModal(false);
        setSearchCustomer(data.fullname)
      })
    }
  }


  const onChange = (event) => {
    if (event.target.name === 'fullname')
      setFullname(event.target.value)
    if (event.target.name === 'phone')
      setPhone(event.target.value)
    if (event.target.name === 'address')
      setAddress(event.target.value)

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
          Indicación cliente: Ingresar nombres telefono y direccion
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
        <TextField
          autoFocus
          margin="dense"
          id="phone"
          label="Telefono"          
          name="phone"
          fullWidth
          onChange={onChange}
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="address"
          label="Direccion"          
          name="address"
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

export default CustomerNew