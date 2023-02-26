
import API from '../consts/url'
import getHeadersAndToken from '../consts/headersToken'
const model = 'api/v1/auth'


const getUser = async (email) => {
    const response = await fetch(`${API}/${model}/user/${email}`,{
        method: 'GET',        
        headers: getHeadersAndToken()
    });    
    const data = await response.json();
//    console.log(data)
    return  data;
}


const login = async (credencials) => {
    const resp = await fetch(`${API}/${model}/authenticate`, {
        method: 'POST',
        body: JSON.stringify(credencials),
        headers: getHeadersAndToken()
    });
    return await resp.json();
}


export {
    getUser,
    login,   
}