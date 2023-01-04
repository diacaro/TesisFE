import React, { useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { getListGreenhouse } from "../../Services/greenhouseService";
import { createDesk } from "../../Services/deskService";
import "./DeskNew.css";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function DeskNew({ open }) {
  //const { setOpenModal, setUpdating } = React.useContext(AppContext);
  const {
    openModal,
    setOpenModal,
    deskIdEdit,
    updating,
    setDeskIdEdit,
    setUpdating,
  } = React.useContext(AppContext);
  const [mesa, setDesk] = useState("");
  const [error, setError] = useState(false);
  const [invernadero, setGreenhouse] = useState([]);
  const [idInvernadero, setGreenhouseId] = useState('');
  
  const onClickSave = () => {
    if (!idInvernadero) {
      setError(true);
    } else {
      createDesk({
        mesa,
        idInvernadero,
        

      }).then((data) => {
        setOpenModal(false);
        setUpdating(false);
      });
    }
  };
  
  useEffect(() => {
    getListGreenhouse().then(data =>
      setGreenhouse(data)
    );
  }, []);

  const onClickClose = () => {
    setOpenModal(false);
    setUpdating(false);
  };

  const onChange = (event) => {
    if (event.target.name === "mesa") setDesk(event.target.value);
    if (event.target.name === 'idInvernadero')setGreenhouseId(event.target.value)
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nueva Mesa </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese los datos de la nueva Mesa
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="mesa"
            label="Mesa"
            type="text"
            name="mesa"
            fullWidth
            onChange={onChange}
            variant="standard"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Invernadero</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="id_invernadero"
              value={idInvernadero}
              name="idInvernadero"
              label="idInvernadero"
              onChange={onChange}
            >
              {invernadero.map((item) => (
                <MenuItem key={item.id} value={item.id}> {item.invernadero}
                </MenuItem>
              ))}
            </Select>
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

export default DeskNew;
