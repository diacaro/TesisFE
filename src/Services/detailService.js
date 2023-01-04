
import API from '../consts/url'
import getHeadersAndToken from '../consts/headersToken'

const listInvoice = async () => {
    const response = await fetch(`${API}/details`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();
    return  data;
}

const findInvoiceById = async (invoiceId) => {
    const response = await fetch(`${API}/details/${invoiceId}`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });  
    const data = await response.json();     
    return  data;
}

const findDetailsByInvoiceId = async (invoiceId) => {
    const response = await fetch(`${API}/detail/${invoiceId}/invoice`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });  
    const data = await response.json();    
    return  data;
}

const createDetail = async (detail) => {
    
    const resp = await fetch(`${API}/detail`, {
        method: 'POST',
        body: JSON.stringify(detail),
        headers: getHeadersAndToken()
    });
    return {status: resp.status, data: await resp.json()}
    
}


const updateInvoice = async (invoice) => {
  
    const resp = await fetch(`${API}/details`, {
        method: 'PUT',
        body: JSON.stringify(invoice),
        headers: getHeadersAndToken()
    });
    return await resp.json();
}

const deleteDetail = async (id) => {
    const resp = await fetch(`${API}/detail/delete/${id}`, {
        method: 'DELETE',
        headers: getHeadersAndToken()              
        });
        return await resp.json();
    }


export {
    listInvoice,
    createDetail,
    updateInvoice,
    findInvoiceById,
    findDetailsByInvoiceId   ,
    deleteDetail
}