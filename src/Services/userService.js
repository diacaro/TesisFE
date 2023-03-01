
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
const register = async (newUser) => {
    const resp = await fetch(`${API}/${model}/register`, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: getHeadersAndToken()
    });
    return await resp.json();
}

const deleteUser = async (userId) => {
    const respo = await fetch(`${API}${model}/user/${userId}`, {
        method: 'DELETE',
        headers: getHeadersAndToken()              
    });
    return await respo.json();
}


export {
    getUser,
    login, 
    register,
    deleteUser,  
}