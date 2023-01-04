
import API from '../consts/url'
import getHeadersAndToken from '../consts/headersToken'
const model = 'productos'

const getListProduct = async () => {
    const response = await fetch(`${API}/productos`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();
//    console.log(data)
    return  data;
}
const getListProductView = async () => {
    const response = await fetch(`${API}/productos/view/full`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();
//    console.log(data)
    return  data;
}

const getProductById = async (productId) => {
    // const response = await fetch(`${API}/${model}/${productId}`,{
    const response = await fetch(`${API}/productos/${productId}`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();

    return  data;
}

// const getProductByCode = async (code) => {
//     const response = await fetch(`${API}/${model}/${code}/code`,{
//         method: 'GET',        
//         headers: getHeadersAndToken()
//     });    
//     const data = await response.json();

//     return  data;
// }

const getListProductDesk= async () => {
    // const response = await fetch(`${API}/${model}/with/mesa`,{
    const response = await fetch(`${API}/mesa`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();
    return  data;
}

const listByCodeProduct = async (itemSearch) => {  
    // const resp = await fetch(`${API}/${model}/search/${itemSearch}/code`,{
    const resp = await fetch(`${API}/${model}/search/${itemSearch}/code`,{
    method: 'GET',        
        headers: getHeadersAndToken()
    });  
    return {status: resp.status, body: await resp.json()}
}

const createProduct = async (product) => {
    const resp = await fetch(`${API}/productos`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: getHeadersAndToken()
    });
    return {status: resp.status, data: await resp.json()}
}

const findByIdProduct = async (productId) => {
    // const response = await fetch(`${API}/productos/${productId}`,{
    const response = await fetch(`${API}/productos/${productId}`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });  
    const data = await response.json();     
    return  data;
}

const listByNameProduct = async (itemSearch) => {
    
    // const response = await fetch(`${API}/productos/search/${itemSearch}`,{
    const response = await fetch(`${API}/productos/${itemSearch}`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });  
    const data = await response.json();     
    return  data;
}

const updateProduct = async (product) => {
  
    const resp = await fetch(`${API}/productos`, {
        method: 'PUT',
        body: JSON.stringify(product),
        headers: getHeadersAndToken()
    });
    return await resp.json();
}
const deleteProduct = async (productId) => {
    const resp = await fetch(`${API}/productos/delete/${productId}`, {
        method: 'DELETE',
        headers: getHeadersAndToken()              
    });
    return await resp.json();
}


export {
    getListProduct,
    createProduct,
    findByIdProduct,
    updateProduct,
    listByNameProduct,
    getListProductDesk,
    listByCodeProduct,
    getProductById,
    deleteProduct,
    // getProductByCode
    getListProductView

}