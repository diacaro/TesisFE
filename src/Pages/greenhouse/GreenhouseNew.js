import React, { useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { createGreenhouse } from '../../Services/greenhouseService'
import './GreenhouseNew.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function GreenhouseNew({ open }) {
  const { searchGreenhouse, setSearchGreenhouse } = React.useContext(AppContext);
  const { setGreenhouseId, setOpenModal, setUpdating, GreenhouseNewInvoice, setGreenhouseNewInvoice } = React.useContext(AppContext);  
  const [invernadero, setInvernadero] = useState({});
  const [sede, setSede] = useState({});
  const [error, setError] = useState(false);

  const onClickSave = () => {

    if (!invernadero) {
      setError(true)
    }
    else {
      createGreenhouse({
        invernadero,
        sede
      }).then(data => {
        setOpenModal(false);
        setUpdating(false);
      })
    }
  }


  const onChange = (event) => {
    if (event.target.name === 'invernadero') setInvernadero(event.target.value)
    if (event.target.name === 'sede') setSede(event.target.value)

  }

  const handleClose = () => {
    setOpenModal(false);
  };

  return (

    <div>

    <Dialog open={open} onClose={handleClose} >
      <DialogTitle>Nuevo Invernadero </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ingrese el nuevo invernadero
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="inernadero"
          label="Invernadero"          
          name="invernadero"
          fullWidth
          onChange={onChange}
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="sede"
          label="Sede"          
          name="sede"
          fullWidth
          onChange={onChange}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={onClickSave}>Agregar</Button>
      </DialogActions>
    </Dialog>
  </div>

  );

}

export default GreenhouseNew