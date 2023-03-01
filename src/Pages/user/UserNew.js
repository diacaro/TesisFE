import React, { useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";

import { register } from "../../Services/userService";
import "./UserNew.css";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function UserNew({ open }) {
  //const { setOpenModal, setUpdating } = React.useContext(AppContext);
  const {
    openModal,
    setOpenModal,
    CategoryIdEdit,
    updating,
    setCategoryIdEdit,
    setUpdating,
  } = React.useContext(AppContext);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(false);
  
  const onClickSave = () => {
    if (!role === " ") {
      setError(true);
    } else {
      register({
        email,
        password,
        role,
      }).then((data) => {
        setOpenModal(false);
        setUpdating(false);
      });
    }
  };
  
  const roleoption = [
    {label: 'USER', value: 'USER'},
    {label: 'ADMIN', value: 'ADMIN'},
    {label: 'SUPERADMIN', value: 'SUPERADMIN'},
  ]

  const onClickClose = () => {
    setOpenModal(false);
    setUpdating(false);
  };

  const onChange = (event) => {
    if (event.target.name === "email") setEmail(event.target.value);
    if (event.target.name === "password") setPassword(event.target.value);
    if (event.target.name === "role") setRole(event.target.value);

  };
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="modal"> 
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nueva Usuario </DialogTitle>
        <div className="modal__container">
        <DialogContent  >
          <DialogContentText>
            Ingrese el nuevo usuario y un rol
          </DialogContentText>
          
          <TextField
            className="modal__input_name "
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            name="email"
            fullWidth
            onChange={onChange}
            variant="standard"
            />

          <TextField
            className="modal__input_name "
            autoFocus
            margin="dense"
            id="password"
            label="password"
            type="password"
            name="password"
            fullWidth
            onChange={onChange}
            variant="standard"
            />
          
          <FormControl fullWidth >
           <InputLabel id="demo-select-small"> Rol</InputLabel>
            <Select 
              className="modal__select"
              labelId="demo-controlled-open-select"
              size="small"
              value={role}
              name="role" 
              id="uncontrolled-native"         
              onChange={onChange}
            >
              <MenuItem value="USER">USER</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="SUPERADMIN">SUPERADMIN</MenuItem>
            </Select>
          
          </FormControl>

        </DialogContent>
              </div>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
          <Button onClick={onClickSave}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserNew;
