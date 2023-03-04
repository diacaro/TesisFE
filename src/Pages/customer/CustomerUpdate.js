import React, { useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { findByIdCustomer, updateCustomer } from '../../Services/customerService'
import './CustomerUpdate.css'

function CustomerUpdate({ customerId }) {

    const [closssing, setClossing] = useState('')
    const { setOpenModal, setUpdating } = React.useContext(AppContext);
    const [customer, setCustomer] = useState({fullname: '', phone: '', address: ''});
  
    const onSubmit = (event) => {
        event.preventDefault();
        updateCustomer(customer).then(data => {
            setClossing(data.fullname);
            setOpenModal(false);
            setUpdating(false);
        }
        )
    }

    const onClickClose = () => {
        setOpenModal(false);
        setUpdating(false);
    }

    // const onChange = (event) => {
    //     setCustomer({
    //         ...customer,
    //         [event.target.name]: event.target.value
    //     })
    // }

    const onChange = (event) => {
        if (event.target.name === 'fullname')
        setCustomer({ ...customer, fullname: event.target.value })
        if (event.target.name === 'phone')
        setCustomer({ ...customer, phone: event.target.value })
        if (event.target.name === 'address')
        setCustomer({ ...customer, address: event.target.value })
    }

    useEffect(() => {
        findByIdCustomer(customerId).then(data =>
            setCustomer(data)
        );
    }, [customerId]);

    return (
        <div className="update">
            <div className="update-form-container">                
                <div className="modal__tittle">
            <h1 className="title">Editar cliente</h1>
                {closssing && <p>Actualizando... {closssing}</p>}
            <button className="modal__button__close" onClick={onClickClose}>x</button>
          </div>
                <form onSubmit={onSubmit}>
                    <div className="update-form-row">
                        <label className="update-label">
                            Nombres
                            <input
                                name="fullname"
                                value={customer.fullname}
                                onChange={onChange}
                                className="update-input"
                            />
                        </label>
    
                    </div>
                    <div className="update-form-row">
                        <label className="update-label">
                            Telefono
                            <input
                                name="phone"
                                value={customer.phone}
                                onChange={onChange}
                                className="update-input"
                            />
                        </label>

                    </div>
                    <div className="update-form-row">
                        <label className="update-label">
                            Direccion
                            <input
                                name="address"
                                value={customer.address}
                                onChange={onChange}
                                className="update-input"
                            />
                        </label>

                    </div>



                    <button type="submit" className="update-primary-button update-button">Actualizar</button>
                </form>
            </div>
        </div>
    );
}

export default CustomerUpdate