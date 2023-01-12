
import API from '../consts/url'
import getHeadersAndToken from '../consts/headersToken'


const getListGreenhouse = async () => {
    const response = await fetch(`${API}/invernadero`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();
//    console.log(data)
    return  data;
}

const createGreenhouse = async (invernadero) => {

    const resp = await fetch(`${API}/invernadero`, {
        method: 'POST',
        body: JSON.stringify(invernadero),
        headers: getHeadersAndToken()
    });
    return await resp.json();
}

const findByIdGreenhouse = async (invernaderoId) => {
    const response = await fetch(`${API}/invernadero/${invernaderoId}`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });  
    const data = await response.json();     
    return  data;
}

const listByNameGreenhouse = async (itemSearch) => {
    
    const response = await fetch(`${API}/invernadero/search/${itemSearch}`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });  
    const data = await response.json();     
    return  data;
}
// const listByNuiGreenhouse = async (itemSearch) => {
  
//     const response = await fetch(`${API}/invernadero/search/${itemSearch}/nui`,{
//         method: 'GET',        
//         headers: getHeadersAndToken()
//     });  
//     const data = await response.json();     
    
//     return  data;
// }


const updateGreenhouse = async (invernadero) => {
  
    const resp = await fetch(`${API}/invernadero`, {
        method: 'PUT',
        body: JSON.stringify(invernadero),
        headers: getHeadersAndToken()
    });
    return await resp.json();
}

const deleteGreenhouse = async (invernaderoId) => {
    const resp = await fetch(`${API}/invernadero/delete/${invernaderoId}`, {
        method: 'DELETE',
        headers: getHeadersAndToken()              
    });
    return await resp.json();
}

export {
    getListGreenhouse,
    createGreenhouse,
    findByIdGreenhouse,
    updateGreenhouse,
    listByNameGreenhouse,
    // listByNuiGreenhouse
    deleteGreenhouse,
    
}