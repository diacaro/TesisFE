
import API from '../consts/url'
import getHeadersAndToken from '../consts/headersToken'

const model ='clientes'


const getListCustomer = async () => {
    const response = await fetch(`${API}/clientes`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();
//    console.log(data)
    return  data;
}

const createCustomer = async (clientes) => {

    const resp = await fetch(`${API}/clientes`, {
        method: 'POST',
        body: JSON.stringify(clientes),
        headers: getHeadersAndToken()
    });
    return await resp.json();
}

const findByIdCustomer = async (clientesId) => {
    const response = await fetch(`${API}/${model}/${clientesId}`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });  
    const data = await response.json();     
    return  data;
}

const listByNameCustomer = async (itemSearch) => {
    
    const response = await fetch(`${API}/clientes/search/${itemSearch}`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });  
    const data = await response.json();     
    return  data;
}
// const listByNuiCustomer = async (itemSearch) => {
  
//     const response = await fetch(`${API}/clientes/search/${itemSearch}/nui`,{
//         method: 'GET',        
//         headers: getHeadersAndToken()
//     });  
//     const data = await response.json();     
    
//     return  data;
// }


const updateCustomer = async (clientes) => {
  
    const resp = await fetch(`${API}/clientes`, {
        method: 'PUT',
        body: JSON.stringify(clientes),
        headers: getHeadersAndToken()
    });
    return await resp.json();
}

const deleteCustomer = async (clientesId) => {
    const resp = await fetch(`${API}/clientes/delete/${clientesId}`, {
        method: 'DELETE',
        headers: getHeadersAndToken()              
    });
    return await resp.json();
}

export {
    getListCustomer,
    createCustomer,
    findByIdCustomer,
    updateCustomer,
    listByNameCustomer,
    // listByNuiCustomer,
    deleteCustomer
    
}