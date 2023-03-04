import React, { useState, useEffect } from "react";
import { getListCustomer, listByNameCustomer, deleteCustomer, searchCustomer } from '../../Services/customerService'
import CustomerNew from "./CustomerNew.js";
import CustomerUpdate from './CustomerUpdate'
import { AppContext } from "../../Context/AppContext";

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


import { Modal } from '../../Modal/index'
import './CustomerPage.css'
import { Button } from "@mui/material";

function CustomerPage() {

  const { openModal, setOpenModal, customerIdEdit,setCustomerIdEdit, updating, setUpdating,  } = React.useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [itemSearch, setItemSearch] = useState('');

  useEffect(() => {

    getListCustomer().then(data => {
      setCustomers(data);
      setLoading(false);
    }
    );
  }, [openModal]);

  const onClick = () => {
    setOpenModal(true)
  }

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (itemSearch.trim().length > 0){

      searchCustomer(itemSearch).then (data=> 
        setCustomers(data)
        ) 
      } else{
        getListCustomer().then(data => {
          setCustomers(data);
          setLoading(false);
        })

      }

  }
  const onChange = (event) => {
    if (event.target.name === 'itemSearch')
      setItemSearch(event.target.value)
  }
  
  const onClickUpdate = (clienteId) => {
    setUpdating(true);
    setOpenModal(true);
    setCustomerIdEdit(clienteId);

  }

  const onClickDelete = (clienteId) => {
    deleteCustomer(clienteId).then( dataDel =>
      {
        getListCustomer().then(data => {
          setCustomers(data);
          setLoading(false);
        })

      }
      )
    
  }

  return (
    <div className="customer-page-container">
      <div className="customer-page">
        <h2>Clientes</h2>

        <div className="button-container">
          <div>
          <form onSubmit={onSubmit}>
            </form>
          <button variant="outlined" className="button-new-customer" onClick={handleClickOpen}>
            + Nuevo
          </button>
          </div>
        </div>

        <div className="button-container">
          <form onSubmit={onSubmit}>
            <div>
              <input
                name="itemSearch"
                value={itemSearch}
                onChange={onChange}
                placeholder="Apellido"
                />
              <button type="submit" className="button-search-customer">Buscar</button>
            </div>
          </form>           
        </div>

        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="left">Telefono</TableCell>
            <TableCell align="left">Direccion</TableCell>            
            <TableCell align="left"><ListIcon /></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left">{row.fullname}</TableCell>
              <TableCell align="left">{row.phone}</TableCell>
              <TableCell align="left">{row.address}</TableCell>              
              <TableCell align="left">
              <IconButton size="small" aria-label="update" onClick={() => { onClickUpdate(row.id) }}>
                <EditIcon fontSize="small" />
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
              {updating ? <CustomerUpdate customerId={customerIdEdit} /> : <CustomerNew open={openModal} />}
            </Modal>
          )
        }
      </div>
    </div>
  );
}

export default CustomerPage;