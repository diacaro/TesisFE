
import API from '../consts/url'
import getHeadersAndToken from '../consts/headersToken'

const listInvoice = async () => {
    const response = await fetch(`${API}/invoices`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();
    return  data;
}

const listInvoiceByGreenhouseId = async (greenhouseId) => {
    const response = await fetch(`${API}/invoices?greenhouseId=${greenhouseId}`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();
    return  data;
}

const findInvoiceById = async (invoiceId) => {
    const response = await fetch(`${API}/invoices/${invoiceId}`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });  
    const data = await response.json();     
    return  data;
}

const findInvoiceByIdAndGreenhouse = async (invoiceId) => {
    const response = await fetch(`${API}/invoices/${invoiceId}/greenhouse`,{
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

const findInvoiceLast = async (invoiceId) => {
    const response = await fetch(`${API}/invoices/last/created`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });  
    const data = await response.json();      
    return  data;
}

const listInvoiceGreenhouse = async () => {
    const response = await fetch(`${API}/invoices`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();    
    return  data;
}

const getInvoiceByOrderId = async (orderId) => {  
    const response = await fetch(`${API}/invoices/${orderId}/order`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });  
    const data = await response.json();      
    return  data;
}

const createInvoice = async (invoice) => {
    
    const resp = await fetch(`${API}/invoices`, {
        method: 'POST',
        body: JSON.stringify(invoice),
        headers: getHeadersAndToken()
    });
    return await resp.json();
}



const listByLastNameInvoice = async (itemSearch) => {    
    const response = await fetch(`${API}/invoices/search/${itemSearch}`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });  
    const data = await response.json();     
    return  data;
}

const updateInvoice = async (invoice) => {
  
    const resp = await fetch(`${API}/invoices`, {
        method: 'PUT',
        body: JSON.stringify(invoice),
        headers: getHeadersAndToken()
    });
    return await resp.json();
}

export {
    listInvoice,
    getInvoiceByOrderId,
    createInvoice,
    updateInvoice,
    listByLastNameInvoice,
    listInvoiceGreenhouse,
    findInvoiceById,
    findInvoiceByIdAndGreenhouse,
    findInvoiceLast,
    findDetailsByInvoiceId,
    listInvoiceByGreenhouseId
    
}