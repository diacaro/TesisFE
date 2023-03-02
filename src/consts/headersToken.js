const getHeadersAndToken = ()=>{
    // const cokieActual = document.cookie;
    return {
        'Access-Control-Allow-Origin':'*',
        // 'Authorization': cokieActual.replace('token=','Bearer '),
        'Content-type': 'application/json'

    }
}
 export default getHeadersAndToken

 