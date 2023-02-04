import React, { useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { getListCustomer } from "../../Services/customerService";
import "./OrdenNew.css";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { createOrden,getListOrden } from "../../Services/OrdenService";

function CustomerNew({ open }) {
  //const { setOpenModal, setUpdating } = React.useContext(AppContext);
  const {
    openModal,
    setOpenModal,
    deskIdEdit,
    updating,
    setDeskIdEdit,
    setUpdating,
  } = React.useContext(AppContext);
  const [createAt, setCreateAt] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [clientes, setClientes] = useState([]);
  const [orden, setOrden] = useState([]);
  const [idClientes, setIdClientes] = useState("");
  
  const onClickSave = () => {
    console.log('Guardando '+ search)
    if (!search) {
      setError(true);

    } else {
      console.log({
        createAt,
        idClientes:search,
        
      })
      createOrden({
        createAt,
        idClientes: search,
        
      }).then((data) => {
        setOpenModal(false);
        setUpdating(false);
      });
    }
  };
  
  useEffect(() => {
    getListCustomer().then(data =>
      setClientes(data));
  }, []);

  const onClickClose = () => {
    setOpenModal(false);
    setUpdating(false);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const onChange = (event) => {
    if (event.target.name === "createAt") 
    setCreateAt(event.target.value);
    if (event.target.name === "idClientes")
    setIdClientes(event.target.value);
    if (event.target.name === 'search')
    setSearch(event.target.value);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nueva Orden </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese la orden
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="createAt"
            // label="Fecha"
            type="date"
            name="createAt"
            fullWidth
            onChange={onChange}
            variant="standard"
          />
          <FormControl fullWidth>
             {/* <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={idClientes}
              name="idClientes"
              label="idClientes"
              onChange={onChange}
            >
              {clientes.map((item) => (
                <MenuItem key={item.id} value={item.id}> {item.fullname}
                </MenuItem>
              ))}
            </Select> */}
              <Autocomplete
              id="code-select"
              size="small"
              options={clientes}
              onChange={(event, option) => setSearch(option.id)}
              autoHighlight
              getOptionLabel={(option) => option.fullname }
              renderOption={(props, option) => (
                <Box component="li"  {...props}>
                  {option.fullname} 
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Cliente"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
          <Button onClick={onClickSave}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomerNew;
