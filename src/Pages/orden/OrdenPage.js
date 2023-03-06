import React, { useState, useEffect } from "react";
import Orden from './Orden'
import { getListOrdenView, deleteOrden,getListOrden } from '../../Services/OrdenService'
import DetallesPage from './../detalles/DetallesPage'
import OrdenNew from "./OrdenNew";
import OrdenUpdate from "./OrdenUpdate";
import { setFormatDate } from "../../utils/DateFormat";
import { useNavigate } from "react-router-dom";


import { AppContext } from "../../Context/AppContext";
import { Modal } from '../../Modal/index'
import './OrdenPage.css'

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
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DetallesPdf from "../detalles/DetallesPdf.js";

// ------------------------color-------------------------

// ------------------------------------------------------
// -----------------------color----------------------------------


  
// --------------------------------------------------------------


function OrdenPage () {

  const { openModal, setOpenModal, updating, detailsId, ordenId, setOrdenId, setUpdating, adding, setAdding, } = React.useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [orden, setOrden] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [createAt, setCreateAt] = useState([]);
  const navigate = useNavigate ()


  // ---------------------estilo columna-----------------------------------
  
//   const styleRow = {
//     "display": "block",
//     "overflow-y": "scroll",
//     "max-height": "160px"
// }

  // ---------------------estilo columna-----------------------------------
  useEffect(() => {
    getListOrdenView().then(data => {
      setOrden(data);
      setLoading(false);
    }
    );
  }, [openModal]);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
  }

  const onClickUpdate = (id) => {
    // navigate("/detalles/"+ id)
    setOpenModal(true);
    setAdding (true);
    setOrdenId (id);

  };
  const onClickPdf = (id) => {
    navigate(`/pdf/${id}`)


  };



  const onClickDelete = (ordenId) => {
    deleteOrden(ordenId).then( dataDel =>
      {
        getListOrdenView().then(data => {
          setOrden(data);
          setLoading(false);
        })

      }
      )
    }

  return (
    <div className="order-page-container">
      <div className="order-page" >

        <div className="order-title-page">

        <h2>Ordenes</h2>
        </div>
        
        <div className="button-container">
          <form onSubmit={onSubmit}>
          
          <button variant="outlined" className="button-new-ordenpage" onClick={handleClickOpen}>
            + Nuevo
          </button>

          </form>
        </div>
          
        <TableContainer   component={Paper}  >
          <Table sx={{ minWidth: 350 }} aria-label="simple table" >
            <TableHead>
              <TableRow>
                {/* <TableCell>Orden</TableCell> */}
                <TableCell align="left">Fecha</TableCell>
                <TableCell align="left">Cliente</TableCell>
                <TableCell align="left"><ListIcon /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orden.map((row) => (
                <TableRow key={row.id} 
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  
                  {/* <TableCell align="left">{row.id}</TableCell> */}
                  <TableCell align="left">{setFormatDate(row.createAt)}</TableCell>
                  <TableCell align="left">{row.clientes}</TableCell>
                  <TableCell align="left" >
                    <IconButton size="small" aria-label="edit" onClick={() => { onClickUpdate(row.id) }}>
                      <DescriptionIcon fontSize="small"  color="success" />
                    </IconButton>
                    <IconButton size="small" aria-label="delete"  onClick={() => { onClickDelete(row.id) }}>
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                    <PictureAsPdfIcon size="small" aria-label="pdf" onClick={() => { onClickPdf(row.id) }}>
                      <DeleteIcon fontSize="small" color="secondary" />
                    </PictureAsPdfIcon>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {!!openModal &&
                (
                  <Modal>
                    { adding ? <DetallesPage ordenId={ordenId} /> :<OrdenNew open={openModal}/> }
                  </Modal>
                )
        }
      
      </div>
       {/* <DeskNew open={openModal}  /> */}
       
    </div>
  );

}
export default OrdenPage ;