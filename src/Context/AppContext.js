import React, { useState } from "react";
const AppContext = React.createContext();

function AppProvider (props) {
    const [ openModal , setOpenModal ]=useState(false);
    const [ customerIdEdit , setCustomerIdEdit ]=useState(null);
    const [ greenhouseIdEdit , setGreenhouseIdEdit ]=useState(null);
    const [ productIdEdit , setProductIdEdit ]=useState(null);
    const [ deskIdEdit , setDeskIdEdit ]=useState(null);
    const [ providerIdEdit , setProviderIdEdit ]=useState(null);
    const [ expenseIdEdit , setExpenseIdEdit ]=useState(null);
    const [ userIdEdit , setUserIdEdit ]=useState(null);
    const [ updating, setUpdating ] = useState(false);
    const [ adding, setAdding ] = useState(false);
    const [ contractId, setContractId ] = useState(false);
    const [ detailsId, setDetailsId ] = useState(false);
    const [ customerNewContract, setCustomerNewContract ] = useState(false);  
    const [ GreenhouseNewContract, setGreenhouseNewContract ] = useState(false);    
    const [greenhouseId, setGreenhouseId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [ordenId, setOrdenId] = useState('');
    const [role, setRole] = useState('');
    const [token, setToken] = useState('');
    const [auth, setAuth] = useState({});

    return(
        <AppContext.Provider value = {{
            openModal,setOpenModal,
            customerIdEdit,setCustomerIdEdit,
            greenhouseIdEdit,setGreenhouseIdEdit,
            productIdEdit , setProductIdEdit,
            updating, setUpdating,
            contractId, setContractId,
            GreenhouseNewContract, setGreenhouseNewContract,
            customerNewContract, setCustomerNewContract,
            userIdEdit , setUserIdEdit,
            deskIdEdit , setDeskIdEdit,
            providerIdEdit , setProviderIdEdit,
            expenseIdEdit , setExpenseIdEdit,
            greenhouseId, setGreenhouseId,
            customerId, setCustomerId,
            ordenId, setOrdenId,
            role, setRole,
            token, setToken,
            detailsId, setDetailsId,
            adding, setAdding, 
            auth, setAuth,
            // cerrarSesionAuth,

            

        }} >
            {props.children}
        </AppContext.Provider>
    )
}

export{AppContext, AppProvider}