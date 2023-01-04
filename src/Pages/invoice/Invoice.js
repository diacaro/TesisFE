
import React, {useContext}from 'react';
import { Link } from "react-router-dom";
import { setFormatDate } from '../../utils/DateFormat'
import './Invoice.css'

function Invoice({ invoiceItem }) {
    return (
        <tr>
            <td>{invoiceItem.id} </td>
            <td>{setFormatDate(invoiceItem.createAt)} </td>
            <td>{invoiceItem.greenhouse} </td>            
                       
            
            <td><Link to={`/InvoiceUpdate/${invoiceItem.id}`}>Ver</Link></td>
     
        </tr>

    );
}

export default Invoice