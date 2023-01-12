import React, { useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";

import { createCategory } from "../../Services/categoryService";
import "./CategoryNew.css";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function CategoryNew({ open }) {
  //const { setOpenModal, setUpdating } = React.useContext(AppContext);
  const {
    openModal,
    setOpenModal,
    CategoryIdEdit,
    updating,
    setCategoryIdEdit,
    setUpdating,
  } = React.useContext(AppContext);
  const [categoria, setCategory] = useState("");
  const [error, setError] = useState(false);
  
  const onClickSave = () => {
    if (!categoria === " ") {
      setError(true);
    } else {
      createCategory({
        categoria,
      }).then((data) => {
        setOpenModal(false);
        setUpdating(false);
      });
    }
  };
  

  const onClickClose = () => {
    setOpenModal(false);
    setUpdating(false);
  };

  const onChange = (event) => {
    if (event.target.name === "categoria") setCategory(event.target.value);

  };
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nueva Category </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese la nueva categoria
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="categoria"
            label="Categoria"
            type="text"
            name="categoria"
            fullWidth
            onChange={onChange}
            variant="standard"
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
          <Button onClick={onClickSave}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CategoryNew;
