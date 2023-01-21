
import API from '../consts/url'
import getHeadersAndToken from '../consts/headersToken'
const model = 'orden'
const getListOrden = async () => {
    const response = await fetch(`${API}/orden`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();
//    console.log(data)
    return  data;
}

const getListOrdenClientes= async (ordenId) => {
    const response = await fetch(`${API}/orden/${ordenId}`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();
//    console.log(data)
    return  data;
}
const getListOrdenView = async () => {
    const response = await fetch(`${API}/orden/view/ordenes`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();
//    console.log(data)
    return  data;
}


const createOrden = async (orden) => {
    const resp = await fetch(`${API}/orden`, {
        method: 'POST',
        body: JSON.stringify(orden),
        headers: getHeadersAndToken()
    });
    return await resp.json();
}

const findByIdOrden = async (ordenId) => {
    const response = await fetch(`${API}/${model}/${ordenId}`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });  
    const data = await response.json();     
    return  data;
}


const updateOrden = async (orden) => {
  
    const resp = await fetch(`${API}/orden`, {
        method: 'PUT',
        body: JSON.stringify(orden),
        headers: getHeadersAndToken()
    });
    return await resp.json();
}


const deleteOrden = async (ordenId) => {
    const resp = await fetch(`${API}/orden/delete/${ordenId}`, {
        method: 'DELETE',
        headers: getHeadersAndToken()              
    });
    return await resp.json();
}

export {
    getListOrden,
    createOrden,
    findByIdOrden,
    updateOrden,
    deleteOrden,
    getListOrdenView,
    getListOrdenClientes
    
}