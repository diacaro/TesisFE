
import React, {useContext}from 'react';
import './User.css'
import { AppContext } from "../../Context/AppContext";
import EditIco from '../../img/ic_create_48px.png'
import DelIco from '../../img/delete.png'

function User({ categoryitem }) {
    const { setCategoryIdEdit, setOpenModal,setUpdating } = useContext(AppContext);
    
    const onClick = () => {
        setUpdating(true);
        setOpenModal(true);
        setCategoryIdEdit(categoryitem.id);
    }

    const onClickDel = () => {
        
    }

    return (
        <tr>
            <td>{categoryitem.id} </td>
            <td>{categoryitem.description} </td>                        
            <td>
                <button>
                    <img src={EditIco} onClick={onClick} alt="edit" width="16" height="16" /> 
                </button>                            
                <button>
                    <img src={DelIco} onClick={onClickDel} alt="delete" width="16" height="16" /> 
                </button>                
            </td>
     
        </tr>

    );
}

export default User