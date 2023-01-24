
import API from '../consts/url'
import getHeadersAndToken from '../consts/headersToken'
const model = 'detalle'

const getListDetalles = async () => {
    const response = await fetch(`${API}/detalle`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();
//    console.log(data)
    return  data;
}
const getListDetallesView = async () => {
    const response = await fetch(`${API}/detalle/view/details`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();
//    console.log(data)
    return  data;
}

const getDetallesById = async (detallesId) => {
    // const response = await fetch(`${API}/${model}/${detallesId}`,{
    const response = await fetch(`${API}/detalle/${detallesId}`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();

    return  data;
}

const getDetalleByOrden = async (idOrden) => {
    const response = await fetch(`${API}/${model}/${idOrden}/orden`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();

    return  data;
}

const getListDetallesOrden= async () => {
    // const response = await fetch(`${API}/${model}/with/mesa`,{
    const response = await fetch(`${API}/orden`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();
    return  data;
}
const getListDetallesProductos= async () => {
    // const response = await fetch(`${API}/${model}/with/mesa`,{
    const response = await fetch(`${API}/productos`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();
    return  data;
}


const createDetalles = async (detalles) => {
    const resp = await fetch(`${API}/detalle`, {
        method: 'POST',
        body: JSON.stringify(detalles),
        headers: getHeadersAndToken()
    });
    return {status: resp.status, data: await resp.json()}
}

const findByIdDetalles = async (detallesId) => {
    // const response = await fetch(`${API}/detalles/${detallesId}`,{
    const response = await fetch(`${API}/detalle/${detallesId}`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });  
    const data = await response.json();     
    return  data;
}

const listByNameDetalles = async (itemSearch) => {
    
    // const response = await fetch(`${API}/detalles/search/${itemSearch}`,{
    const response = await fetch(`${API}/detalle/${itemSearch}`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });  
    const data = await response.json();     
    return  data;
}

const updateDetalles = async (detalles) => {
  
    const resp = await fetch(`${API}/detalle`, {
        method: 'PUT',
        body: JSON.stringify(detalles),
        headers: getHeadersAndToken()
    });
    return await resp.json();
}
const deleteDetalles = async (detallesId) => {
    const resp = await fetch(`${API}/detalle/delete/${detallesId}`, {
        method: 'DELETE',
        headers: getHeadersAndToken()              
    });
    return await resp.json();
}


export {
    getListDetalles,
    createDetalles,
    findByIdDetalles,
    updateDetalles,
    listByNameDetalles,
    getListDetallesOrden,
    // listByCodeDetalles,
    getDetallesById,
    deleteDetalles,
    // getDetallesByCode
    getListDetallesProductos,
    getListDetallesView,
    getDetalleByOrden

}