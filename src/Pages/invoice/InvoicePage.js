import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import InvoiceList from './InvoiceList'
import Invoice from './Invoice'
import { InvoiceContext } from "./InvoiceContext";
import { Link } from 'react-router-dom';
import { setFormatDate } from "../../utils/DateFormat";
import { findInvoiceByIdAndGreenhouse, listInvoiceByGreenhouseId, createInvoice, updateInvoice } from '../../Services/invoiceService'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableViewIcon from '@mui/icons-material/TableView';

import IconButton from '@mui/material/IconButton';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Avatar from '@mui/material/Avatar';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


import './InvoicePage.css'

function InvoicePage({ greenhouse }) {
  const navigate = useNavigate();
  const { invoiceNew, setInvoiceNew, invoiceIdNew, setInvoiceIdNew } = React.useContext(InvoiceContext);

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemSearch, setItemSearch] = useState('');

  useEffect(() => {

    if (!!greenhouse.id)
      listInvoiceByGreenhouseId(greenhouse.id).then(data => {
        setInvoices(data);
        setLoading(false)
      }
      );
  }, [greenhouse.id])

  const onChange = (event) => {
    if (event.target.name === 'itemSearch')
      setItemSearch(event.target.value)
  }
  const onClickNew = (invoiceId) => {    
    if (!invoiceId) {
      createInvoice(
        {
          greenhouseId: greenhouse.id,
          createAt: new Date()
        }
      ).then(data => {
        setInvoiceIdNew(data.id)
        setInvoiceNew(true)
      })
    }
    else {
      setInvoiceIdNew(invoiceId)
      setInvoiceNew(true)
    }
  }

  return (
    <div className="greenhouse-page-container">
      <div className="greenhouse-page">
        <Grid item xs>
          <Typography gutterBottom variant="h5" component="div">
            Facturas
          </Typography>
        </Grid>
        <Box sx={{ m: 2 }}>
          <Typography gutterBottom variant="body1">
            Cliente:
          </Typography>
          {
            !!greenhouse.fullname && (
              <div className="newInvoice">
                <Chip color="secondary" avatar={<Avatar color="secondary">{greenhouse.fullname.substring(0, 1)} </Avatar>} label={greenhouse.fullname} />
                <Button className="newInvoice__button" variant="outlined" onClick={() => onClickNew('')}> Nueva Factura</Button>
              </div>
            )
          }
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Fecha</TableCell>
                <TableCell align="left"><ListIcon /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {invoices.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{setFormatDate(row.createAt)}</TableCell>
                  <TableCell align="left">
                    <IconButton
                      size="small"
                      aria-label="delete"
                      component={Link}
                      onClick={() => onClickNew(row.id)}>
                      <TableViewIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </TableContainer>

      </div>
    </div>

  );

}

export default InvoicePage