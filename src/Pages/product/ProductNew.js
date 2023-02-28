import React, { useState, useEffect } from "react";
// ------------------------Formik & yup------------------------

import {useFormik} from 'formik'
import * as Yup from 'yup';

// ------------------------------------------------------------
import { AppContext } from "../../Context/AppContext";
import { createProduct } from "../../Services/productService";
import { getListDesk, getListDeskInvernadero  } from "../../Services/deskService";
import { getListGreenhouse } from "../../Services/greenhouseService";
import { getListCategory } from "../../Services/categoryService";
import styles from "./ProductNew.module.css";

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
import { Grid } from "@mui/material";



function ProductNew() {
  // const { setRefreshProducts } = React.useContext(InvoiceContext);
  const { setOpenModal, setUpdating } = React.useContext(AppContext);
  // const [nombre, setProduct] = useState('');
  const [mesa, setDesk] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [Greenhouse, setGreenhouse] = useState([]);
  const [idCategoria, setIdCategoria] = useState("");
  const [idMesa, setIdMesa] = useState("");
  const [nombre, setNombre] = useState("");
  const [clima, setClima] = useState("");
  const [precio, setPrecio] = useState("");
  const [idInvernadero, setIdInvernadero] = useState("");
  const [sede, setSede] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [error, setError] = useState(false);

  const [saving, setSaving] = useState(false);

  // Formulario Formik y validacion Yup
 
 
  const  formik  = useFormik({
    initialValues: {
      nombre: '',
      clima: '',
      precio: '',
      idCategoria: '',
      idMesa: '',
      idInvernadero: '',
      sede: '',
      cantidad:'',
    },

    validationSchema: Yup.object({
      nombre: Yup.string().required('Debes ingresar un nombre'),
      clima: Yup.string().required("Debes ingresar el clima"),
      precio: Yup.number().required('Debes ingresar el precio'),
      idCategoria: Yup.string().required('Debes ingresar la categoriao'),
      idMesa: Yup.string().required('Debes ingresar la mesa'),
      idInvernadero: Yup.string().required('Debes ingresar el invernadero'),
      sede: Yup.string().required('Debes ingresar la sede'),
      cantidad: Yup.number().required('Debes ingresar la cantidad'),
      
    }),
    
     onSubmit : (event) => {
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
        clima,
        precio,
        idCategoria,
        sede,
        cantidad

      }).then((data) => {
        if (data.status === 200) {

        } else {
          setError(true);
          setSaving(false);
        }
      });
    },
  });

   const onSubmit = (event) => {
        if (event.target.name === "idMesa") setIdMesa(event.target.value);
        if (event.target.name === "idInvernadero") setIdInvernadero(event.target.value);
     event.preventDefault();
     setSaving(true);
     setError(false);


     // setRefreshProducts(false);
     if (!idMesa) {
       
       setError(true);
       return;
     }
     createProduct({
       idMesa,
       idInvernadero,


     }).then((data) => {
       if (data.status === 200) {

       } else {
         setSaving(false);
         setError(true);
       }
     });
   };




  useEffect(() => {
    if (idInvernadero)
    getListDeskInvernadero(idInvernadero).then((data) => 
    setDesk(data));

  }, [idInvernadero]);

  useEffect(() => {

    getListGreenhouse().then((data) => 
    setGreenhouse(data));
  
    getListCategory().then((data) => 
    setCategoria(data));
  }, []);




  const handleClose = () => {
    setOpenModal(false);
  };

  // const handleChange = (event) => {
  //   setClima({value: event.target.value});
  // }

  const onChange = (event) => {
    if (event.target.name === "nombre") setNombre(event.target.value);
    if (event.target.name === "clima") setClima(event.target.value);
    if (event.target.name === "precio") setPrecio(event.target.value);
    if (event.target.name === "idCategoria") setIdCategoria(event.target.value);
    if (event.target.name === "idMesa") setIdMesa(event.target.value);
    if (event.target.name === "idInvernadero") setIdInvernadero(event.target.value);
    if (event.target.name === "sede") setSede(event.target.value);
    if (event.target.name === "cantidad") setCantidad(event.target.value);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__label}>
        <div className={styles.modal__tittle}>
        <Typography  variant="h3" component="h2">
          Nuevo Producto
        </Typography>

        </div>

        <form onSubmit={formik.handleSubmit} className={styles.producto__form}>
          
          <Grid item xs={12} md={6}>
          <TextField
            
            type="text"
            // size="small"
            // id="outlined-basic"
            fullWidth
            label="Nombre"
            variant="outlined"
            name="nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            error={formik.errors.nombre}
            helperText={formik.errors.nombre}
                        
          />
          </Grid>

          <Grid item xs={12} md={6}>
          <TextField
            // className={styles.modal__input}
            type="text"
            // size="small"
            // id="outlined-basic"
            fullWidth
            label="Clima"
            variant="outlined"
            name="clima"
            value={formik.values.clima}
            onChange={formik.handleChange}
            error={formik.errors.clima}
            helperText={formik.errors.clima}
          />
          </Grid>

          <TextField
            // className={styles.modal__input}
            type="text"
            // size="small"
            // id="outlined-basic"
            fullWidth
            label="Precio"
            variant="outlined"
            name="precio"
            value={formik.values.precio}
            onChange={formik.handleChange}
            error={formik.errors.precio}
            helperText={formik.errors.precio}
          />

          <Grid item xs={12} md={6}>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
            <Select
              
              type="select"
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.idCategoria}
              name="idCategoria"
              label="categoryId"
              onChange={formik.handleChange}
              error={formik.errors.idCategoria}
              helperText={formik.errors.idCategoria}
              >
              {categoria.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.categoria}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
            </Grid>
            
          <Grid item xs={12} md={6}>

          <FormControl fullWidth  >
            <InputLabel id="demo-simple-select-label">Mesa</InputLabel>
            <Select
            onSubmit={onSubmit} 
            // className={styles.modal__select}
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={idMesa}
              name="idMesa"
              label="deskId"
              onChange={onChange}
              error={formik.errors.idMesa}
              helperText={formik.errors.idMesa}
            >
              {mesa.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.mesa}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
              </Grid>


          <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            
            <InputLabel id="demo-simple-select-label">Invernadero</InputLabel>
            <Select
            onSubmit={onSubmit} 
            // className={styles.modal__select}
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={idInvernadero}
              name="idInvernadero"
              label="IdInvernadero"
              onChange={onChange}
              error={formik.errors.idInvernadero}
              helperText={formik.errors.idInvernadero}
            >
              {Greenhouse.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.invernadero}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          </Grid>

        <Grid>


          <TextField
            // className={styles.modal__input}
            size="small"
            id="outlined-basic"
            label="Sede"
            variant="outlined"
            name="sede"
            value={formik.values.sede}
            onChange={formik.handleChange}
            error={formik.errors.sede}
            helperText={formik.errors.sede}
            />

        </Grid>

        <Grid item xs={12} md={6}>

          <TextField
            // className={styles.modal__input}
            size="small"
            type="number"
            id="outlined-basic"
            label="Cantidadio"
            variant="outlined"
            name="cantidad"
            value={formik.values.cantidad}
            onChange={formik.handleChange}
            error={formik.errors.cantidad}
            helperText={formik.errors.cantidad}
            />
          </Grid>

          <Button className={styles.primary__button } type="submit" variant="outlined">
            Guardar
          </Button>

          {error && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error"> Todos los campos deben estar llenos </Alert>
            </Stack>
          )}
          {saving && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="info">Guardando</Alert>
            </Stack>
          )}
          <Button className={styles.primary__button} variant="outlined" onClick={handleClose}>Cerrar</Button>
        </form>
      </div>
    </div>
  );
}

export default ProductNew;
