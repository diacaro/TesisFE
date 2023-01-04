
import API from '../consts/url'
import getHeadersAndToken from '../consts/headersToken'
const model = 'categoria'
const getListCategory = async () => {
    const response = await fetch(`${API}/categoria`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();
//    console.log(data)
    return  data;
}


const createCategory = async (categoria) => {
    const resp = await fetch(`${API}/categoria`, {
        method: 'POST',
        body: JSON.stringify(categoria),
        headers: getHeadersAndToken()
    });
    return await resp.json();
}

const findByIdCategory = async (categoriaId) => {
    const response = await fetch(`${API}/${model}/${categoriaId}`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });  
    const data = await response.json();     
    return  data;
}


const updateCategory = async (categoria) => {
  
    const resp = await fetch(`${API}/categoria`, {
        method: 'PUT',
        body: JSON.stringify(categoria),
        headers: getHeadersAndToken()
    });
    return await resp.json();
}


const deleteCategory = async (categoriaId) => {
    const resp = await fetch(`${API}/categoria/delete/${categoriaId}`, {
        method: 'DELETE',
        headers: getHeadersAndToken()              
    });
    return await resp.json();
}

export {
    getListCategory,
    createCategory,
    findByIdCategory,
    updateCategory,deleteCategory
    
}