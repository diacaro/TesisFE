import React, { useState, useEffect } from "react";
import {getListDetallesView, getListDetalles, listByCodeDetalles,deleteDetalles,createDetalles,getListDetallesProductos} from "../../Services/detallesService";
import { getListProduct } from "../../Services/productService";
import DetallesNew from "./DetallesNew.js";
import DetallesUpdate from "./DetallesUpdate";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import IconButton from "@mui/material/IconButton";
import ListIcon from "@mui/icons-material/List";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { AppContext } from "../../Context/AppContext";
import { Modal } from "../../Modal/index";
import "./DetallesPage.css";
import { Box, Button, Checkbox, MenuItem, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";


function DetallesPage() {
  const {
    openModal,
    setOpenModal,
    detallesIdEdit,
    updating,
    setDetallesIdEdit,
    setUpdating,
  } = React.useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [detalles, setDetalles] = useState([]);
  const [itemSearch, setItemSearch] = useState("");
  const [mesa, setMesa] = useState([]);
  const [Greenhouse, setGreenhouse] = useState([]);
  const [idMesa, setIdMesa] = useState("");
  const [nombre, setNombre] = useState([]);
  const [products, setProducts] = useState([]);
  const [idProduct, setIdProduct] = useState("");
  const [idInvernadero, setIdInvernadero] = useState("");
  const [cantidad, setCantidad] = useState([]);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);


  useEffect(() => {
     getListProduct().then((data) => 
    setProducts(data));   

  }, []);

  const onChange = (event) => {
    if (event.target.name === 'itemSearch')    
    setItemSearch(event.target.value)
    if (event.target.name === "cantidad") 
    setCantidad(event.target.value);
    if (event.target.name === "nombre") 
    setNombre(event.target.value);
    if (event.target.name === "idMesa") 
    setIdMesa(event.target.value);
    if (event.target.name === "idInvernadero") 
    setIdInvernadero(event.target.value);
  }



  const onClickUpdate = (detallesId) => {
    setUpdating(true);
    setOpenModal(true);
    setDetallesIdEdit(detallesId);
  };
  const onClickDelete = (detallesId) => {
    deleteDetalles(detallesId).then((dataDel) => {
      getListDetalles().then((data) => {
        setDetalles(data);
        setLoading(false);
      });
    });
  };

  // const onSubmit = (event) => {
  //   event.preventDefault();

  //   setSaving(true);
  //   setError(false);
  //   // setRefreshProducts(false);

  // };

  const onSubmit = (event) => {
    event.preventDefault();
    setSaving(true);
    setError(false);
    // setRefreshProducts(false);
    if (!idProduct) {
      setError(true);
      return;
    }
    createDetalles({
      nombre,
      idMesa,
      idInvernadero,
      cantidad

    }).then((data) => {
      if (data.status === 200) {
        setNombre('');
        setIdMesa('');
        setIdInvernadero('');
        setCantidad('')
      } else {
        setError(true);
        setSaving(false);
      }
    });
  };


  return (
    <div className="product-page-container"   >
      <div className="product-page">
        <h2>Detalles</h2>
        <form onSubmit={onSubmit}>
        <div className="combobox-container" >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            name="idProduct"
            onChange={(event, option) => setItemSearch( option.id)}

            // getOptionLabel={(option) => option.nombre + ' ' + option.idMesa+ ' ' + option.idInvernadero}
            options={products.map((product) => product.nombre)}
            sx={{ width: 350 }}
            // renderOption={(props, option) => (
            //   <Box component="li"  {...props}>
            //     {option.nombre} 
            //   </Box>
            // )}
            renderInput={(params) => <TextField {...params} label="Seleccionar Productos"  />}
            
            />
             <TextField
            size="small"
            type="number"
            id="outlined-basic"
            label="Cantidad"
            variant="outlined"
            name="cantidad"
            value={cantidad}
            onChange={onChange}
          />
           <Button type="submit" variant="outlined">
            Agregar
          </Button>
        </div>
        </form>

        <div className="button-container">
          <form onSubmit={onSubmit}>
            <input
              name="itemSearch"
              placeholder="Buscar"
              value={itemSearch}
              onChange={onChange}
            />
            <button type="submit" className="button-new-product">
              {" "}
              Buscar{" "}
            </button>
          </form>
        </div>
        <dir />
        <dir />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="left">Mesa</TableCell>
                <TableCell align="left">Invernadero</TableCell>
                <TableCell align="left">Cantidad</TableCell>
                <TableCell align="left">
                  <ListIcon />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {detalles.map((row) => {

                  <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell padding="checkbox">

                    </TableCell>
                    <TableCell align="left">{row.nombre}</TableCell>
                    <TableCell align="left">{row.mesa}</TableCell>
                    <TableCell align="left">{row.invernadero}</TableCell>
                    <TableCell align="left">{row.cantidad}</TableCell>
                    <TableCell align="left">
                      <IconButton
                        size="small"
                        aria-label="edit"
                        onClick={() => {
                        onClickUpdate(row.id);
                        }}
                      >
                        <EditIcon fontSize="small" color="info" />
                      </IconButton>

                      <IconButton
                        size="small"
                        aria-label="delete"
                        onClick={() => {
                          onClickDelete(row.id);
                        }}
                      >
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {!!openModal && (
          <Modal>
            {updating ? (
              <DetallesUpdate detallesId={detallesIdEdit} />
            ) : (
              <DetallesNew />
            )}
          </Modal>
        )}
      </div>
    </div>
  );
}

export default DetallesPage;
