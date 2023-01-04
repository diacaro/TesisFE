import React, { useState } from "react";
const AppContext = React.createContext();

function AppProvider (props) {
    const [ openModal , setOpenModal ]=useState(false);
    const [ greenhouseIdEdit , setGreenhouseIdEdit ]=useState(null);
    const [ productIdEdit , setProductIdEdit ]=useState(null);
    const [ deskIdEdit , setDeskIdEdit ]=useState(null);
    const [ providerIdEdit , setProviderIdEdit ]=useState(null);
    const [ expenseIdEdit , setExpenseIdEdit ]=useState(null);
    const [ userIdEdit , setUserIdEdit ]=useState(null);
    const [ updating, setUpdating ] = useState(false);
    const [ contractId, setContractId ] = useState(false);
    const [ GreenhouseNewContract, setGreenhouseNewContract ] = useState(false);    
    const [greenhouseId, setGreenhouseId] = useState('');
    const [role, setRole] = useState('');
    const [token, setToken] = useState('');

    return(
        <AppContext.Provider value = {{
            openModal,setOpenModal,
            greenhouseIdEdit,setGreenhouseIdEdit,
            productIdEdit , setProductIdEdit,
            updating, setUpdating,
            contractId, setContractId,
            GreenhouseNewContract, setGreenhouseNewContract,
            userIdEdit , setUserIdEdit,
            deskIdEdit , setDeskIdEdit,
            providerIdEdit , setProviderIdEdit,
            expenseIdEdit , setExpenseIdEdit,
            greenhouseId, setGreenhouseId,
            role, setRole,
            token, setToken,

            

        }} >
            {props.children}
        </AppContext.Provider>
    )
}

export{AppContext, AppProvider}