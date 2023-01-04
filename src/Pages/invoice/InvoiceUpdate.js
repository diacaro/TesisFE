import React, { useState, useEffect } from "react";
import { findInvoiceByIdAndGreenhouse, findDetailsByInvoiceId, updateInvoice } from '../../Services/invoiceService'
import { createDetail, deleteDetail } from '../../Services/detailService'
import { getListProductDesk, getProductById } from '../../Services/productService'
import { InvoiceContext } from "../invoice/InvoiceContext";

import { itemSchema } from './validation/ItemValidation'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { setFormatDate } from "../../utils/DateFormat";
import './InvoiceUpdate.css'

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function InvoiceUpdate({ invoiceId }) {

  const { refreshProducts } = React.useContext(InvoiceContext);
  const [invoice, setInvoice] = useState({});
  const [details, setDetails] = useState([]);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [exists, setExists] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [format, setFormat] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    findInvoiceByIdAndGreenhouse(invoiceId)
      .then(data => {
        setInvoice(data)
      }
      )
    findDetailsByInvoiceId(invoiceId)
      .then(data => {
        setDetails(data)
      }
      )
    getListProductDesk()
      .then(data => {
        setProducts(data)
      }
      )
    if (refreshProducts)
      getListProductDesk()
        .then(data => {
          setProducts(data)
        }
        )
  }, [invoiceId, refreshProducts])

  const onClickDelete = (detailId) => {
    setSaving(true);
    setExists(false);
    deleteDetail(detailId).then(dataDetail =>
      findDetailsByInvoiceId(invoiceId)
        .then(data => {
          setDetails(data)
          setSaving(false);
        }
        )
    )
  }

  const handleChange = (event) => {
    if (event.target.name === 'quantity')
      setQuantity(event.target.value);
    if (event.target.name === 'format')
      setFormat(event.target.value);
    if (event.target.name === 'notes')
      setNotes(event.target.value);
    if (event.target.name === 'search')
      setSearch(event.target.value);
  };

  const createItem = async (event) => {
    setExists(false)
    event.preventDefault()
    let formData = {
      search, quantity, format, notes
    }

    if (await itemSchema.isValid(formData)) {
      setSaving(true);
      setIsValid(true)
      getProductById(search).then(dataProduct =>
        createDetail({
          productId: dataProduct.id,
          invoiceId: invoiceId,
          quantity,
          format,
          notes
        }).then(data => {
          if (data.status === 200) {
            findDetailsByInvoiceId(data.data.invoiceId)
              .then(datafull => {
                setDetails(datafull)
                setSaving(false);
              }
              )
          } else {
            setExists(true);
            setSaving(false);
          }
        })
      )
    }
    else {
      setIsValid(false)
    }

  }

  return (
    <div className="invoice-update-container">
      <div className="invoice-update">
        <h2>Factura</h2>
        <div className="greenhouse__details">
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={!!invoice.id && invoice.greenhouse}
                secondary={!!invoice.address && invoice.address} />
            </ListItem>
          </List>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha"
              value={setFormatDate(invoice.createAt)}
              inputFormat="DD/MM/YYYY"
              onChange={(newValue) => {
                setSaving(true)
                updateInvoice({ ...invoice, createAt: newValue }).then(data =>
                  {
                    setInvoice({ ...invoice, createAt: data.createAt })
                    setSaving(false)
                  }
                )
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </LocalizationProvider>
        </div>
        {
          !isValid && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error">Llenar campos</Alert>
            </Stack>
          )
        }
        {
          exists && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error">Ya existe</Alert>
            </Stack>
          )
        }
        {
          saving && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="info">Guardando</Alert>
            </Stack>
          )
        }
        <form onSubmit={createItem} >
          <div className="invoice__form">
            <Autocomplete
              id="code-select"
              size="small"
              options={products}
              onChange={(event, option) => setSearch(option.id)}
              autoHighlight
              getOptionLabel={(option) => option.code + ' ' + option.brand}
              renderOption={(props, option) => (
                <Box component="li"  {...props}>
                  {option.code} {option.brand}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Código de color"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />

            <TextField
              size="small"
              value={quantity}
              name="quantity"
              onChange={handleChange}
              id="outlined-number"
              label="Cant."
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />


            <Box sx={{ minWidth: 50 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Medida</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={format}
                  name="format"
                  label="Pres"
                  onChange={handleChange}
                >
                  <MenuItem value="LT">LT</MenuItem>
                  <MenuItem value="GL">GL</MenuItem>
                  <MenuItem value="CN">CN</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="invoice__form__button">
            <TextField size="small"
              id="outlined-basic"
              label="Observación"
              variant="outlined"
              value={notes}
              name="notes"
              onChange={handleChange}
            />
            <Button type="submit" variant="contained">Agregar</Button>
          </div>
        </form>
        <div className="details">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" >
              <TableHead>
                <TableRow>
                  <TableCell align="left">Cant.</TableCell>
                  <TableCell align="left">Pres.</TableCell>
                  <TableCell align="left">Marca</TableCell>
                  <TableCell align="left">Codigo</TableCell>
                  <TableCell align="left">Color</TableCell>
                  <TableCell align="left">Amb</TableCell>
                  <TableCell align="left">Observaciones</TableCell>
                  <TableCell align="left">::</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {details.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{row.quantity}</TableCell>
                    <TableCell align="left">{row.format}</TableCell>
                    <TableCell align="left">{row.brand}</TableCell>
                    <TableCell align="left">{row.code}</TableCell>
                    <TableCell align="left">{row.color}</TableCell>
                    <TableCell align="left">{row.table}</TableCell>
                    <TableCell align="left">{row.notes}</TableCell>
                    <TableCell align="left">
                      <IconButton size="small" aria-label="delete" onClick={() => { onClickDelete(row.id) }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="invoice__pagos">
          </div>
        </div>
      </div>
    </div>

  );
}

export default InvoiceUpdate;