import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { findInvoiceById, createInvoice, updateInvoice } from '../../Services/invoiceService'
import { listByNuiGreenhouse, findByIdGreenhouse, listByNameGreenhouse } from '../../Services/greenhouseService'
import { InvoiceContext } from "../invoice/InvoiceContext";
import { AppContext } from "../../Context/AppContext";
import { Modal } from '../../Modal/index'
import './InvoiceNew.css'
import GreenhouseNew from "../greenhouse/GreenhouseNew";
import ProductNew from "../../Pages/product/ProductNew";
import { setFormatDate } from "../../utils/DateFormat";
import SearchIco from '../../img/ic_search_48px.png'
import NewIco from '../../img/ic_add_48px.png'
import GoArrowIco from '../../img/ic_trending_flat_48px.png'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';

import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';

import InvoiceUpdate from "./InvoiceUpdate";
import InvoicePage from "./InvoicePage";

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function InvoiceNew() {

  const {
    openModal, setOpenModal,
    setGreenhouseNewInvoice,

  } = React.useContext(AppContext);

  const navigate = useNavigate();
  const { searchGreenhouse, setSearchGreenhouse,
    invoiceNew, setInvoiceNew, invoiceIdNew
  } = React.useContext(InvoiceContext);

  const [invoice, setInvoice] = useState({});

  const [greenhouse, setGreenhouse] = useState({});
  const [greenhouses, setGreenhouses] = useState([]);
  const [greenhouseNotFound, setGreenhouseNotFound] = useState(false)
  const [openInvioce, setOpenInvioce] = useState(false)


  useEffect(() => {
    if (searchGreenhouse.trim().length !== 0)
      listByNameGreenhouse(searchGreenhouse).then(data => {
        setGreenhouses(data);
      })
  }, [searchGreenhouse])

  const onClickNextInvoice = (greenhouse) => {
    setGreenhouse(greenhouse)
    setInvoiceNew(false)


  }

  const onChangeGreenhouse = (event) => {
    if (event.target.name === 'searchGreenhouse')
      setSearchGreenhouse(event.target.value)
  }

  const handleClickOpen = () => {
    setOpenModal(true);

  };

  return (

    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                label="Buscar cliente"
                variant="standard"
                name="searchGreenhouse"
                value={searchGreenhouse}
                onChange={onChangeGreenhouse}

              />
              <IconButton color="primary" aria-label="add to shopping cart" onClick={handleClickOpen}>
                <AddIcon />
              </IconButton>
            </Box>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {greenhouses.map((greenhouse) => (
                <ListItemButton key={greenhouse.id} onClick={() => onClickNextInvoice(greenhouse)}>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={greenhouse.fullname} secondary={greenhouse.address} />
                </ListItemButton>
              ))}
            </List>
            <div>{(greenhouses.length === 0) &&
              <span className="invoiceNew__spannotfound">No encontrado </span>
            }
            </div>
          </Box>
        </Grid>
        <Grid item xs={6}>
          {!invoiceNew ?
            <InvoicePage greenhouse={greenhouse} />
            :
            <InvoiceUpdate greenhouse={greenhouse} invoiceId={invoiceIdNew} />
          }
        </Grid>
        <Grid item xs={3}>
          <ProductNew />
        </Grid>
      </Grid>
      <GreenhouseNew open={openModal} />
    </Box>
  );
}

export default InvoiceNew;