import React, { useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { createProduct } from "../../Services/productService";
import { getListDesk } from "../../Services/deskService";
import { getListGreenhouse } from "../../Services/greenhouseService";
import { getListCategory } from "../../Services/categoryService";
import { InvoiceContext } from "../invoice/InvoiceContext";
import styles from "./DetallesNew.module.css";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";



function ProductNew() {
  // const { setRefreshProducts } = React.useContext(InvoiceContext);
  const { setOpenModal, setUpdating } = React.useContext(AppContext);
  // const [nombre, setProduct] = useState('');
  const [mesa, setDesk] = useState([]);
  const [Greenhouse, setGreenhouse] = useState([]);
  const [idMesa, setIdMesa] = useState("");
  const [nombre, setNombre] = useState("");
  const [idInvernadero, setIdInvernadero] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [error, setError] = useState(false);

  const [saving, setSaving] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setSaving(true);
    setError(false);
    // setRefreshProducts(false);
    if (!nombre) {
      setError(true);
      return;
    }
    createProduct({
      nombre,
      idMesa,
      idInvernadero,
      cantidad
      
    }).then((data) => {
      if (data.status === 200) {
        // setRefreshProducts(true);
        // setProduct("");
        // setCategory("");
        // setDesk("");
        // setGreenhouse("");
        // setSaving(false);
      } else {
        setError(true);
        setSaving(false);
      }
    });
  };

  useEffect(() => {
    getListDesk().then((data) => 
    setDesk(data));

    getListGreenhouse().then((data) => 
    setGreenhouse(data));
  
  }, []);


  const handleClose = () => {
    setOpenModal(false);
  };

  // const handleChange = (event) => {
  //   setClima({value: event.target.value});
  // }

  const onChange = (event) => {
    if (event.target.name === "nombre") setNombre(event.target.value);
    if (event.target.name === "idMesa") setIdMesa(event.target.value);
    if (event.target.name === "idInvernadero") setIdInvernadero(event.target.value);
    if (event.target.name === "cantidad") setCantidad(event.target.value);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.product__container}>
        <Typography className={styles.title} variant="h5" component="h5">
          Productos
        </Typography>

        <form onSubmit={onSubmit} className={styles.form}>
          <TextField
            size="small"
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
            name="nombre"
            value={nombre}
            onChange={onChange}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Mesa</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={idMesa}
              name="idMesa"
              label="deskId"
              onChange={onChange}
            >
              {mesa.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.mesa}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Invernadero</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={idInvernadero}
              name="idInvernadero"
              label="IdInvernadero"
              onChange={onChange}
            >
              {Greenhouse.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.invernadero}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            size="small"
            type="number"
            id="outlined-basic"
            label="Cantidadio"
            variant="outlined"
            name="cantidad"
            value={cantidad}
            onChange={onChange}
          />

          <Button type="submit" variant="outlined">
            Guardar
          </Button>

          {error && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error"> Invernadero || Mesa y Sede </Alert>
            </Stack>
          )}
          {saving && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="info">Guardando</Alert>
            </Stack>
          )}
          <Button onClick={handleClose}>Cerrar</Button>
        </form>
      </div>
    </div>
  );
}

export default ProductNew;
