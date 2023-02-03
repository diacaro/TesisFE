import React, { useState, useEffect } from "react";
import { getListProductDesk, getListProductView, listByCodeProduct, deleteProduct } from '../../Services/productService'
import ProductNew from "./ProductNew.js";
import ProductUpdate from './ProductUpdate'
import { filter } from 'lodash';


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
import { Card, Checkbox, Container, TablePagination } from "@mui/material";
import StockListHead from "./Head&Toolbar/ProductListHead";
import ProductListToolbar from "./Head&Toolbar/ProductListToolbar";
import Scrollbar from '../../Components/scrollbar';

// ------------------------------------------------------


const TABLE_HEAD = [
  // { id: 'select', label: 'Select', alignRight: false },
  { id: 'nombre', label: 'Nombre', alignRight: false },
  { id: 'clima', label: 'Clima', alignRight: false },
  { id: 'precio', label: 'Precio', alignRight: false },
  { id: 'Categoria', label: 'Categoria', alignRight: false },
  { id: 'Mesa', label: 'Mesa', alignRight: false },
  { id: 'Invernadero', label: 'Invernadero', alignRight: false },
  { id: 'sede', label: 'Sede', alignRight: false },
  { id: 'cantidad', label: 'Cantidad', alignRight: false },
  <ListIcon />,
  
];





// ------------------------------------------------------
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}


function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_product) => _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

// -------------------------------------------------------

function ProductPage() {
  const { openModal, setOpenModal,productIdEdit,updating, setProductIdEdit, setUpdating } = React.useContext(AppContext);
  
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [itemSearch, setItemSearch] = useState('');
  
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  

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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };


  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const filteredStock = applySortFilter(products, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredStock.length && !!filterName;


  const onChange = (event) => {
    if (event.target.name === 'itemSearch')    
    setItemSearch(event.target.value)
  }
  

  return (
    <div className="product-page-container">
      <div className="product-page">
      <h2>Productos</h2>

    <Container>
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
    <Card>
      <ProductListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
      {/* <Scrollbar> */}
      <TableContainer component={Paper} sx={{ minWidth: 700 }}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <StockListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={products.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                      />
        {/* <TableHead>
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
        </TableHead> */}
        <TableBody>
          {filteredStock.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
            const { nombre} = row;
            const selectedProduct = selected.indexOf(nombre) !== -1;
            return (
            <TableRow
            hover key={row.id}
            role="checkbox"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            tabIndex={-1}
            selected={selectedProduct}
            >
              <TableCell padding="checkbox">
                <Checkbox checked={selectedProduct} onChange={(event) => handleClick(event, nombre)} />
              </TableCell>
              <TableCell align="left">{row.nombre}</TableCell>
              <TableCell align="center">{row.clima}</TableCell>
              <TableCell align="center">{row.precio}{" $"}</TableCell>
              <TableCell align="center">{row.categoria}</TableCell>           
              <TableCell align="center">{row.mesa}</TableCell>
              <TableCell align="center">{row.invernadero}</TableCell>
              <TableCell align="center">{row.sede}</TableCell>
              <TableCell align="center">{row.cantidad}</TableCell>
              <TableCell align="left">
                <IconButton size="small" aria-label="edit" onClick={() => { onClickUpdate(row.id) }}>
                  <EditIcon fontSize="small"  color="info"/>
                </IconButton>
                
               
                <IconButton size="small" aria-label="delete"  onClick={() => { onClickDelete(row.id) }}>
                   <DeleteIcon fontSize="small" color="error"/>
                   </IconButton>
              </TableCell>
            </TableRow>
            );
          })}
        </TableBody>
      </Table>
      
     </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
     {/* </Scrollbar> */}
     </Card>
    </Container>
      

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