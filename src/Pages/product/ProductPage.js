import React, { useState, useEffect } from "react";
import { getListProductDesk, getListProductView, listByCodeProduct, deleteProduct } from '../../Services/productService'
import ProductNew from "./ProductNew.js";
import ProductUpdate from './ProductUpdate'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { AppContext } from "../../Context/AppContext";
import { Modal } from '../../Modal/index'
import './ProductPage.css'

function ProductPage() {
  const { openModal, setOpenModal,productIdEdit,updating, setProductIdEdit, setUpdating } = React.useContext(AppContext);
  
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [itemSearch, setItemSearch] = useState('');
    
  useEffect(() => {
    getListProductView().then(data => {
      setProducts(data);     
      setLoading(false);            
    }
    );
  }, [openModal]);

  const onClick = () => {
    setOpenModal(true)
  }

  const onClickUpdate = (productId) => {
    setUpdating(true);
    setOpenModal(true);
    setProductIdEdit(productId);
  }
  const onClickDelete = (productId) => {
    deleteProduct(productId).then( dataDel =>
      {
        getListProductView().then(data => {
          setProducts(data);
          setLoading(false);
        })

      }
      )
    
  }


  const onSubmit = (event) => {
    event.preventDefault();


  }
  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const onChange = (event) => {
    if (event.target.name === 'itemSearch')    
    setItemSearch(event.target.value)
  }
  

  return (
    <div className="product-page-container">
      <div className="product-page">
      <h2>Productos</h2>

      <div className="button-container" >
          <form onSubmit={onSubmit}>
          </form>
          <button variant="outlined" className="button-new-product" onClick={handleClickOpen}>
            Nuevo
          </button>
        </div>
        
      <div className="button-container">
        <form onSubmit={onSubmit}>
          <input 
              name="itemSearch"
              placeholder="Buscar"
              value={itemSearch}
              onChange={onChange}
          />
          <button type="submit" className="button-new-product"> Buscar </button>
        </form>
        
      </div>
      <dir/>
      <dir/>
      <TableContainer component={Paper}>


      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="left">Clima</TableCell>            
            <TableCell align="left">Precio</TableCell>
            <TableCell align="left">Categoria</TableCell>
            <TableCell align="left">Mesa</TableCell>
            <TableCell align="left">Invernadero</TableCell>
            <TableCell align="left">Sede</TableCell>
            <TableCell align="left">Cantidad</TableCell>
            <TableCell align="left"><ListIcon /></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.nombre}</TableCell>
              <TableCell align="left">{row.clima}</TableCell>
              <TableCell align="left">{row.precio}{" $"}</TableCell>
              <TableCell align="left">{row.categoria}</TableCell>           
              <TableCell align="left">{row.mesa}</TableCell>
              <TableCell align="left">{row.invernadero}</TableCell>
              <TableCell align="left">{row.sede}</TableCell>
              <TableCell align="left">{row.cantidad}</TableCell>
              <TableCell align="left">
                <IconButton size="small" aria-label="edit" onClick={() => { onClickUpdate(row.id) }}>
                  <EditIcon fontSize="small"  color="info"/>
                </IconButton>
                
               
                <IconButton size="small" aria-label="delete"  onClick={() => { onClickDelete(row.id) }}>
                   <DeleteIcon fontSize="small" color="error"/>
                   </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      
    </TableContainer>
      

      {!!openModal &&
        (
          <Modal>
            { updating ? <ProductUpdate productId={productIdEdit} /> :<ProductNew /> }
          </Modal>
        )
      }
    </div>
    </div>
  );
}

export default ProductPage;