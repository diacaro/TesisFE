
import API from '../consts/url'
import getHeadersAndToken from '../consts/headersToken'
const model = 'mesa'
const getListDesk = async () => {
    const response = await fetch(`${API}/mesa`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();
//    console.log(data)
    return  data;
}


const createDesk = async (mesa) => {
    const resp = await fetch(`${API}/mesa`, {
        method: 'POST',
        body: JSON.stringify(mesa),
        headers: getHeadersAndToken()
    });
    return await resp.json();
}

const findByIdDesk = async (mesaId) => {
    const response = await fetch(`${API}/${model}/${mesaId}`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });  
    const data = await response.json();     
    return  data;
}


const updateDesk = async (mesa) => {
  
    const resp = await fetch(`${API}/mesa`, {
        method: 'PUT',
        body: JSON.stringify(mesa),
        headers: getHeadersAndToken()
    });
    return await resp.json();
}


const deleteDesk = async (mesaId) => {
    const resp = await fetch(`${API}/mesa/delete/${mesaId}`, {
        method: 'DELETE',
        headers: getHeadersAndToken()              
    });
    return await resp.json();
}

export {
    getListDesk,
    createDesk,
    findByIdDesk,
    updateDesk,deleteDesk
    
}